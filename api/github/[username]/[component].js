import { buildGithubSvg } from '../../../src/features/github/utils/githubSvg.js';

const API = 'https://api.github.com';
const ALLOWED_COMPONENTS = new Set([
  'stats',
  'streak',
  'trophies',
  'badges',
  'followers',
  'commits',
  'activity',
  'snake',
  'repo',
  'contributors',
  'metrics',
  'views',
]);

const githubJson = async (path) => {
  const response = await fetch(API + path, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'markdown-shop-svg-endpoint',
    },
  });
  if (!response.ok) {
    const error = new Error('GitHub API request failed.');
    error.status = response.status;
    error.remaining = response.headers.get('x-ratelimit-remaining');
    throw error;
  }
  return response.json();
};

const pages = async (path, maxPages = 3) => {
  const results = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const values = await githubJson(
      path + separator + 'per_page=100&page=' + page
    );
    if (!Array.isArray(values)) return values;
    results.push(...values);
    if (values.length < 100) break;
  }
  return results;
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Accept');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res
      .status(405)
      .json({ error: 'Use GET to request a public GitHub SVG.' });
  }

  const username = String(req.query.username || req.query.user || '');
  const component = String(req.query.component || '')
    .replace(/\.svg$/i, '')
    .toLowerCase();
  const repo = String(req.query.repo || 'markdown-shop');
  if (
    !/^[A-Za-z0-9-]{1,39}$/.test(username) ||
    username.startsWith('-') ||
    username.endsWith('-')
  ) {
    return res.status(400).json({ error: 'Provide a valid GitHub username.' });
  }
  if (!ALLOWED_COMPONENTS.has(component)) {
    return res.status(404).json({ error: 'Unknown SVG component.' });
  }
  if (component === 'contributors' && !/^[A-Za-z0-9_.-]{1,100}$/.test(repo)) {
    return res.status(400).json({ error: 'Provide a valid repository name.' });
  }

  try {
    const profile = await githubJson('/users/' + encodeURIComponent(username));
    const [repositories, events, contributors] = await Promise.all([
      pages(
        '/users/' + encodeURIComponent(username) + '/repos?sort=updated',
        3
      ),
      pages('/users/' + encodeURIComponent(username) + '/events/public', 3),
      component === 'contributors'
        ? pages(
            '/repos/' +
              encodeURIComponent(username) +
              '/' +
              encodeURIComponent(repo) +
              '/contributors',
            1
          )
        : Promise.resolve([]),
    ]);
    const svg = buildGithubSvg(
      component,
      { profile, repos: repositories, events },
      username,
      contributors
    );
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600'
    );
    return res.status(200).send(svg);
  } catch (error) {
    const status =
      error.remaining === '0' || error.status === 403
        ? 429
        : error.status === 404
          ? 404
          : 502;
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=30, stale-while-revalidate=60'
    );
    return res.status(status).json({
      error:
        status === 429
          ? 'GitHub rate limit reached. Try again later.'
          : status === 404
            ? 'GitHub profile or repository was not found.'
            : 'Could not fetch public GitHub data.',
    });
  }
}
