import { useMemo } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import { getGithubUser } from '../utils/githubUser';

const buildTrophyMarkdown = (userName) =>
  `<img src="https://github-profile-trophy.vercel.app/?username=${userName}&theme=tokyonight&no-frame=true&margin-w=4" alt="GitHub Trophies" style="width:100%;max-width:100%;border-radius:8px;" />`;

const GithubTrophies = () => {
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const trophyMarkdown = useMemo(
    () => buildTrophyMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const openInNewTab = () => {
    window.open(`https://github.com/${resolvedUserName}`, '_blank', 'noopener');
  };

  return (
    <CardContainer
      sx={{
        p: 2,
        borderRadius: 2,
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5,
        }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
          }}>
          GitHub Trophies
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DualActionButton
            content={trophyMarkdown}
            contentType='markdown'
            variant='compact'
            size='small'
          />
          <Tooltip title='View on GitHub'>
            <IconButton
              size='small'
              onClick={openInNewTab}
              aria-label='Open GitHub profile'>
              <OpenInNewIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        component='img'
        src={`https://github-profile-trophy.vercel.app/?username=${resolvedUserName}&theme=tokyonight&no-frame=true&margin-w=4`}
        alt={`GitHub trophies for ${resolvedUserName}`}
        sx={{
          width: '100%',
          maxWidth: '100%',
          borderRadius: 1,
          display: 'block',
          mx: 'auto',
        }}
      />
    </CardContainer>
  );
};

export default GithubTrophies;
