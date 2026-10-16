import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import ComponentPreview from '@/components/ui/ComponentPreview';
import SvgDownloadButton from '@/components/ui/SvgDownloadButton';
import useGithub from '../useGithub';
import { buildGithubSvg, githubSvgSizes } from '../utils/githubSvg';
import { useGithubTheme } from '../GithubThemeContext';

const descriptions = {
  stats:
    'A compact profile overview with repository, follower, following, and gist counts, plus a breakdown of the most common repository languages.',
  streak:
    'A snapshot of consecutive days represented in recent public GitHub events. It does not use GitHub’s private contribution calendar.',
  trophies:
    'A celebratory summary of public repositories, followers, earned stars, and forks.',
  badges:
    'A clean set of profile badges for public repositories, stars, forks, and open issues.',
  followers:
    'A focused follower count with the account’s following total alongside it.',
  commits:
    'A day-by-day view of commits visible in the recent public event feed.',
  activity:
    'A contribution-style activity grid based on recent public events, not GitHub’s full contribution calendar.',
  snake:
    'A compact activity grid that highlights days with visible public GitHub events.',
  repo: 'A repository card showing its description, stars, forks, and open issues.',
  contributors:
    'A short list of contributors to the Markdown Shop repository and their visible contribution counts.',
  metrics:
    'A compact collection of account and repository metrics available through GitHub’s public API.',
  views:
    'An explanatory card for profile views. GitHub does not provide profile view totals through this public API.',
};

const GithubNativePanel = ({ kind, title }) => {
  const { data, loading, error, notice, userName, githubRequest } = useGithub();
  const { flavor, size, setSize } = useGithubTheme();
  const [contributors, setContributors] = useState([]);
  const [contributorError, setContributorError] = useState('');
  const [contributorsLoading, setContributorsLoading] = useState(false);

  useEffect(() => {
    if (kind !== 'contributors') return undefined;
    if (!userName) {
      setContributors([]);
      setContributorError('');
      return undefined;
    }
    const controller = new AbortController();
    setContributorError('');
    setContributorsLoading(true);
    githubRequest(
      '/repos/' +
        encodeURIComponent(userName) +
        '/markdown-shop/contributors?per_page=20',
      controller.signal
    )
      .then((result) => setContributors(result.data))
      .catch((err) => {
        if (err.name !== 'AbortError') setContributorError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setContributorsLoading(false);
      });
    return () => controller.abort();
  }, [kind, userName, githubRequest]);

  const svgMarkup = useMemo(
    () => buildGithubSvg(kind, data, userName, contributors, flavor, size),
    [kind, data, userName, contributors, flavor, size]
  );
  const downloadFilename =
    `${kind}-${userName || 'github-profile'}`.replace(/[^a-z0-9-]/gi, '-') +
    '.svg';
  return (
    <CardContainer
      sx={{
        p: 0,
        height: '100%',
        minWidth: 0,
        overflow: 'hidden',
        '&:hover': { transform: 'none' },
      }}
      role='region'
      aria-label={title}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={1}
        sx={{ mb: 1.5, minWidth: 0, flexWrap: 'wrap' }}>
        <Typography variant='h6' sx={{ minWidth: 0 }}>
          {title}
        </Typography>
        <Stack direction='row' alignItems='center' spacing={0.75}>
          <ComponentPreview
            title={title}
            description={descriptions[kind] || 'A GitHub profile component.'}
            downloadContent={svgMarkup}
            downloadFilename={downloadFilename}
            svgSize={size}
            svgSizes={githubSvgSizes}
            onSvgSizeChange={setSize}>
            <Box
              sx={{ lineHeight: 0 }}
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          </ComponentPreview>
          <SvgDownloadButton content={svgMarkup} filename={downloadFilename} />
          <DualActionButton
            content={svgMarkup}
            contentType='markdown'
            variant='icon-only'
            size='small'
          />
        </Stack>
      </Stack>
      {loading && (
        <Stack direction='row' spacing={1} alignItems='center' role='status'>
          <CircularProgress size={18} />
          <Typography>Loading GitHub data…</Typography>
        </Stack>
      )}
      {error && (
        <Alert severity='error' role='alert'>
          {error} Public information may be temporarily unavailable.
        </Alert>
      )}
      {notice && (
        <Alert severity='warning' sx={{ mb: 1 }} role='status'>
          {notice}
        </Alert>
      )}
      {kind === 'contributors' && contributorError && (
        <Alert severity='info' role='status'>
          {contributorError}
        </Alert>
      )}
      {kind === 'contributors' && contributorsLoading && (
        <Typography role='status'>Loading contributors…</Typography>
      )}
      {!loading && !error && !data && (
        <Typography color='text.secondary' role='status'>
          No GitHub data available.
        </Typography>
      )}
      {data && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            overflow: 'hidden',
            lineHeight: 0,
            '& > svg': {
              display: 'block',
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
            },
          }}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      )}
    </CardContainer>
  );
};
export default GithubNativePanel;
