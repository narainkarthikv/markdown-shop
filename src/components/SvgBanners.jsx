import React, { useMemo } from 'react';
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import DualActionButton from './ui/DualActionButton.jsx';
import ComponentPreview from './ui/ComponentPreview';
import SvgDownloadButton from './ui/SvgDownloadButton';
import useGithub from '@/features/github/useGithub';
import { useGithubTheme } from '@/features/github/GithubThemeContext';
import {
  buildGithubProfileBannerSvg,
  githubSvgSizes,
} from '@/features/github/utils/githubSvg';

const SvgBanners = React.memo(() => {
  const { data, userName, loading, error, notice } = useGithub();
  const { flavor, size, setSize } = useGithubTheme();
  const svgMarkup = useMemo(
    () => buildGithubProfileBannerSvg(data, userName, flavor, size),
    [data, userName, flavor, size]
  );
  const filename =
    `github-profile-${userName || 'summary'}`.replace(/[^a-z0-9-]/gi, '-') +
    '.svg';
  const preview = (
    <Box
      sx={{
        width: '100%',
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
  );

  return (
    <Box
      component='section'
      aria-labelledby='profile-banner-title'
      sx={{
        width: '100%',
        minWidth: 0,
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: 'var(--ms-radius-2xl)',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent='space-between'
        spacing={2}
        sx={{ mb: 2 }}>
        <Box>
          <Typography id='profile-banner-title' variant='h6' fontWeight={700}>
            Profile summary banner
          </Typography>
        </Box>
        <Stack
          direction='row'
          alignItems='center'
          spacing={0.75}
          sx={{ flexShrink: 0, alignSelf: { xs: 'flex-start', sm: 'center' } }}>
          <ComponentPreview
            title='Profile summary banner'
            description='A personalized banner built from the loaded GitHub profile: name, handle, bio, location or company, and public account counts. It follows the studio theme and size settings.'
            downloadContent={svgMarkup}
            downloadFilename={filename}
            svgSize={size}
            svgSizes={githubSvgSizes}
            onSvgSizeChange={setSize}>
            {preview}
          </ComponentPreview>
          <SvgDownloadButton content={svgMarkup} filename={filename} />
          <DualActionButton
            content={svgMarkup}
            contentType='svg'
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
      {notice && !error && (
        <Alert severity='warning' role='status'>
          {notice}
        </Alert>
      )}
      {!loading && !error && !data?.profile && (
        <Typography color='text.secondary' role='status'>
          No GitHub data available.
        </Typography>
      )}
      {data?.profile && !loading && (
        <Box
          sx={{
            width: '100%',
            minWidth: 0,
            overflow: 'hidden',
            lineHeight: 0,
            borderRadius: 'var(--ms-radius-xl)',
            border: '1px solid',
            borderColor: 'divider',
          }}>
          {preview}
        </Box>
      )}
    </Box>
  );
});

SvgBanners.displayName = 'SvgBanners';

export default SvgBanners;
