import { useMemo } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import { getGithubUser } from '../utils/githubUser';

const buildActivityMarkdown = (userName) =>
  `<img src="https://github-readme-activity-graph.vercel.app/graph?username=${userName}&theme=tokyo-night&hide_border=true" alt="GitHub Activity Graph" style="width:100%;border-radius:8px;" />`;

export const GithubActivityGraph = () => {
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const activityMarkdown = useMemo(
    () => buildActivityMarkdown(resolvedUserName),
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
          Activity Graph
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DualActionButton
            content={activityMarkdown}
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
        src={`https://github-readme-activity-graph.vercel.app/graph?username=${resolvedUserName}&theme=tokyo-night&hide_border=true`}
        alt={`GitHub activity graph for ${resolvedUserName}`}
        sx={{
          width: '100%',
          borderRadius: 1,
          display: 'block',
        }}
      />
    </CardContainer>
  );
};

export default GithubActivityGraph;
