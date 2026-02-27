import { useMemo } from 'react';
import { Typography, Stack, IconButton, Box, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import { getGithubUser } from '../utils/githubUser';

const buildBadgesMarkdown = (userName) =>
  [
    `![GitHub stars](https://img.shields.io/github/stars/${userName}?style=for-the-badge&logo=github)`,
    `![GitHub forks](https://img.shields.io/github/forks/${userName}/readme-shop?style=for-the-badge&logo=github)`,
    `![Issues](https://img.shields.io/github/issues/${userName}/readme-shop?style=for-the-badge&logo=github)`,
  ].join(' ');

const GithubBadges = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const badgesMarkdown = useMemo(
    () => buildBadgesMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const handleInsert = () => embedMarkdown(badgesMarkdown);

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
      aria-label='GitHub Badges Component'>
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
          GitHub Badges
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DualActionButton
            content={badgesMarkdown}
            onInsert={handleInsert}
            contentType='markdown'
            size='small'
            variant='compact'
          />
          <Tooltip title='View on shields.io' arrow>
            <IconButton
              size='small'
              onClick={() =>
                window.open('https://shields.io', '_blank', 'noopener')
              }
              aria-label='Open shields.io'
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
        direction='row'
        spacing={1}
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        sx={{ mb: 2 }}>
        <Box
          component='img'
          src={`https://img.shields.io/github/stars/${resolvedUserName}?style=for-the-badge&logo=github`}
          alt='GitHub stars badge'
          sx={{ height: 28 }}
        />
        <Box
          component='img'
          src={`https://img.shields.io/github/forks/${resolvedUserName}/readme-shop?style=for-the-badge&logo=github`}
          alt='GitHub forks badge'
          sx={{ height: 28 }}
        />
        <Box
          component='img'
          src={`https://img.shields.io/github/issues/${resolvedUserName}/readme-shop?style=for-the-badge&logo=github`}
          alt='GitHub issues badge'
          sx={{ height: 28 }}
        />
      </Stack>
    </CardContainer>
  );
};

export default GithubBadges;
