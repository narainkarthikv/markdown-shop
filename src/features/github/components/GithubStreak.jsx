import { useMemo } from 'react';
import { Box, Typography, Stack, Tooltip, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import { getGithubUser } from '../utils/githubUser';

const buildStreakMarkdown = (userName) =>
  `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${userName}&theme=tokyonight&hide_border=true" alt="GitHub Streak Stats" style="width:100%;max-width:500px;border-radius:8px;" />`;

const GithubStreak = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const streakMarkdown = useMemo(
    () => buildStreakMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const handleInsert = () => embedMarkdown(streakMarkdown);

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
      aria-label='GitHub Contribution Streak Component'>
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
          Contribution Streak
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DualActionButton
            content={streakMarkdown}
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

      <Box
        component='img'
        src={`https://github-readme-streak-stats.herokuapp.com/?user=${resolvedUserName}&theme=tokyonight&hide_border=true`}
        alt={`GitHub contribution streak for ${resolvedUserName}`}
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 1.5,
          display: 'block',
          mx: 'auto',
          mb: 2,
          border: (theme) =>
            `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
        }}
      />
    </CardContainer>
  );
};

export default GithubStreak;
