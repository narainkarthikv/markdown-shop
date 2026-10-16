import { useMemo, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import GithubContext from './GithubContext';
const configuredBase =
  import.meta.env.VITE_GITHUB_API_BASE_URL || 'https://api.github.com';
let API_BASE = 'https://api.github.com';
try {
  const configuredUrl = new URL(configuredBase);
  if (configuredUrl.origin === API_BASE) API_BASE = configuredUrl.origin;
} catch {
  // Keep requests on GitHub's API host when the public config is invalid.
}
const TOKEN_KEY = 'markdown-shop-github-token';
const request = async (path, token, signal) => {
  const response = await fetch(API_BASE + path, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    signal,
  });
  if (!response.ok) {
    const error = new Error(
      response.status === 401
        ? 'The saved token is invalid or expired.'
        : response.status === 403 &&
            response.headers.get('x-ratelimit-remaining') === '0'
          ? 'GitHub API rate limit reached. Try again later or add a personal access token.'
          : 'GitHub API request failed (' + response.status + ').'
    );
    error.status = response.status;
    throw error;
  }
  return {
    data: await response.json(),
    remaining: response.headers.get('x-ratelimit-remaining'),
  };
};
const requestPages = async (path, token, signal, maxPages = 10) => {
  const items = [];
  let remaining = null;
  for (let page = 1; page <= maxPages; page += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const result = await request(
      path + separator + 'per_page=100&page=' + page,
      token,
      signal
    );
    if (!Array.isArray(result.data)) return result;
    items.push(...result.data);
    remaining = result.remaining;
    if (result.data.length < 100) break;
  }
  return { data: items, remaining };
};
export const GithubDataProvider = ({ children }) => {
  const storedUserName = useMarkdownStore((state) => state.userName);
  const setStoredUserName = useMarkdownStore((state) => state.setUserName);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState(() => {
    try {
      return window.localStorage.getItem(TOKEN_KEY) || '';
    } catch {
      return '';
    }
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [remaining, setRemaining] = useState(null);
  const tokenRef = useRef(token);
  const requestControllerRef = useRef(null);
  tokenRef.current = token;
  const refresh = useCallback(
    async (requestedUserName) => {
      const cleanUserName = String(requestedUserName || '').trim();
      if (!cleanUserName) return;
      requestControllerRef.current?.abort();
      const controller = new AbortController();
      requestControllerRef.current = controller;
      setUserName(cleanUserName);
      setStoredUserName(cleanUserName);
      setData(null);
      setRemaining(null);
      setLoading(true);
      setError('');
      setNotice('');
      try {
        let profile;
        let requestToken = tokenRef.current;
        try {
          profile = await request(
            '/users/' + encodeURIComponent(cleanUserName),
            requestToken,
            controller.signal
          );
        } catch (err) {
          if (!requestToken || ![401, 403].includes(err.status)) throw err;
          setNotice(
            err.status === 401
              ? 'The saved token was rejected. Showing public data without authentication.'
              : 'The token could not access this profile. Showing public data without authentication.'
          );
          requestToken = '';
          profile = await request(
            '/users/' + encodeURIComponent(cleanUserName),
            '',
            controller.signal
          );
        }
        // The profile is enough to build the summary banner. Publish it now so
        // a failure in a secondary endpoint cannot leave the banner empty.
        setData({ profile: profile.data, repos: [], events: [] });
        setRemaining(profile.remaining);

        const [reposResult, eventsResult] = await Promise.allSettled([
          requestPages(
            '/users/' +
              encodeURIComponent(cleanUserName) +
              '/repos?sort=updated',
            requestToken,
            controller.signal
          ),
          requestPages(
            '/users/' + encodeURIComponent(cleanUserName) + '/events/public',
            requestToken,
            controller.signal,
            3
          ),
        ]);
        if (controller.signal.aborted) return;
        const repos =
          reposResult.status === 'fulfilled' ? reposResult.value : null;
        const events =
          eventsResult.status === 'fulfilled' ? eventsResult.value : null;
        setData({
          profile: profile.data,
          repos: repos?.data || [],
          events: events?.data || [],
        });
        setRemaining(
          profile.remaining ?? repos?.remaining ?? events?.remaining ?? null
        );
        if (!repos || !events) {
          setNotice(
            'Profile loaded. Some repository or activity details could not be fetched.'
          );
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setData(null);
          setError(err.message || 'Could not load GitHub data.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    },
    [setStoredUserName]
  );
  const saveToken = useCallback((value, remember) => {
    const clean = value.trim();
    setToken(clean);
    setNotice('');
    try {
      if (remember && clean) window.localStorage.setItem(TOKEN_KEY, clean);
      else window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      setNotice(
        'Browser storage is unavailable; the token will remain in memory for this session.'
      );
    }
  }, []);
  const removeToken = useCallback(() => {
    saveToken('', false);
    setNotice('Token removed. Public data remains available.');
  }, [saveToken]);
  const githubRequest = useCallback(
    (path, signal) => request(path, tokenRef.current, signal),
    []
  );
  const value = useMemo(
    () => ({
      userName,
      storedUserName,
      refresh,
      tokenConfigured: Boolean(token),
      data,
      loading,
      error,
      notice,
      remaining,
      saveToken,
      removeToken,
      githubRequest,
    }),
    [
      userName,
      storedUserName,
      refresh,
      token,
      data,
      loading,
      error,
      notice,
      remaining,
      saveToken,
      removeToken,
      githubRequest,
    ]
  );
  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};
GithubDataProvider.propTypes = { children: PropTypes.node.isRequired };
