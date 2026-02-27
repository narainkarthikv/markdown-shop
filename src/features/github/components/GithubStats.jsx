import { useMemo } from 'react';
import { Box, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import { getGithubUser } from '../utils/githubUser';

const buildStatsMarkdown = (userName) =>
  [
    `<img src="https://github-readme-stats.vercel.app/api?username=${userName}&theme=tokyonight&hide_border=true" alt="GitHub Stats" style="width:100%;max-width:400px;margin-right:8px;border-radius:8px;" />`,
    `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${userName}&layout=compact&theme=tokyonight&count_private=true&hide_border=true" alt="Top Languages" style="width:100%;max-width:300px;border-radius:8px;" />`,
  ].join('\n');

const GithubStats = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const statsMarkdown = useMemo(
    () => buildStatsMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const handleInsert = () => embedMarkdown(statsMarkdown);

  const openInNewTab = () => {
    window.open(`https://github.com/${resolvedUserName}`, '_blank', 'noopener');
  };

  return (
    <CardContainer
      sx={{
        mb: 3,
        p: 3,
        borderRadius: 2,
        border: (theme) =>
          `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: (theme) =>
            theme.customTokens?.border || theme.palette.divider,
          boxShadow: (theme) =>
            theme.customTokens?.shadow.md || theme.shadows[3],
        },
      }}
      role='article'
      aria-label='GitHub Stats Component'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            color: (theme) =>
              theme.customTokens?.textPrimary || theme.palette.text.primary,
          }}>
          GitHub Stats
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DualActionButton
            content={statsMarkdown}
            onInsert={handleInsert}
            contentType='markdown'
            size='small'
            variant='compact'
          />
          <Tooltip title='View on GitHub' arrow>
            <IconButton
              size='small'
              onClick={openInNewTab}
              aria-label='Open GitHub profile'
              sx={{
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.customTokens?.surfaceHover ||
                    theme.palette.action.hover,
                },
              }}>
              <OpenInNewIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        flexWrap='nowrap'
        justifyContent='center'
        alignItems='center'
        sx={{ mb: 2 }}>
        <Box
          component='img'
          src={`https://github-readme-stats.vercel.app/api?username=${resolvedUserName}&theme=tokyonight&hide_border=true`}
          alt={`GitHub contribution stats for ${resolvedUserName}`}
          sx={{
            width: '100%',
            maxWidth: { xs: 420, sm: 350 },
            borderRadius: 1.5,
            border: (theme) =>
              `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
          }}
        />

        <Box
          component='img'
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${resolvedUserName}&layout=compact&theme=tokyonight&count_private=true&hide_border=true`}
          alt={`Top languages used by ${resolvedUserName}`}
          sx={{
            width: '100%',
            maxWidth: { xs: 420, sm: 280 },
            borderRadius: 1.5,
            border: (theme) =>
              `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
          }}
        />
      </Stack>
    </CardContainer>
  );
};

export default GithubStats;
