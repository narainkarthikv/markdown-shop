import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import useGithub from '../useGithub';
import { buildGithubSvg } from '../utils/githubSvg';

const GithubNativePanel = ({ kind, title }) => {
  const { data, loading, error, notice, remaining, userName, githubRequest } =
    useGithub();
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
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
    () => buildGithubSvg(kind, data, userName, contributors),
    [kind, data, userName, contributors]
  );
  return (
    <CardContainer
      sx={{ p: 2.5, height: '100%' }}
      role='region'
      aria-label={title}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={1}
        sx={{ mb: 1.5 }}>
        <Typography variant='h6'>{title}</Typography>
        <DualActionButton
          content={svgMarkup}
          contentType='markdown'
          variant='compact'
          size='small'
        />
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
          sx={{ width: '100%', overflowX: 'auto', lineHeight: 0 }}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      )}
      {remaining !== null && (
        <Typography variant='caption' display='block' sx={{ mt: 1 }}>
          GitHub API requests remaining: {remaining}
        </Typography>
      )}
      <Button
        size='small'
        onClick={() => embedMarkdown(svgMarkup)}
        sx={{ mt: 1 }}>
        Insert SVG snapshot
      </Button>
    </CardContainer>
  );
};
export default GithubNativePanel;
