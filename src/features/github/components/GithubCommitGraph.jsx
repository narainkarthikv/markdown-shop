import { useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import { getGithubUser } from '../utils/githubUser';

const buildCommitsMarkdown = (userName) =>
  `<img src="https://github-readme-stats.vercel.app/api?username=${userName}&show_icons=true&count_private=true&theme=tokyonight&hide_border=true&include_all_commits=true" alt="GitHub Commits" />`;

const GithubCommitGraph = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const commitsMarkdown = useMemo(
    () => buildCommitsMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const handleClick = () => embedMarkdown(commitsMarkdown);

  const openInNewTab = () => {
    window.open(`https://github.com/${resolvedUserName}`, '_blank', 'noopener');
  };

  return (
    <CardContainer
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        mb: 3,
        p: 2,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
      role='button'
      tabIndex={0}
      aria-label='Insert commit graph'>
      <Typography
        variant='h6'
        sx={{
          mb: 1.5,
          fontWeight: 600,
          textAlign: 'center',
          fontSize: '1.125rem',
        }}>
        Commit Statistics
      </Typography>

      <Box
        component='img'
        src={`https://github-readme-stats.vercel.app/api?username=${resolvedUserName}&show_icons=true&count_private=true&theme=tokyonight&hide_border=true&include_all_commits=true`}
        alt='GitHub commit statistics'
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 1,
          display: 'block',
          mx: 'auto',
        }}
      />

      <Stack
        direction='row'
        spacing={1}
        justifyContent='center'
        sx={{ mt: 1.5 }}>
        <Tooltip title='Insert into editor'>
          <Button
            startIcon={<InsertDriveFileIcon />}
            size='small'
            variant='contained'
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}>
            Insert
          </Button>
        </Tooltip>

        <Tooltip title='View on GitHub'>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              openInNewTab();
            }}
            aria-label='Open GitHub profile'>
            <OpenInNewIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Stack>
    </CardContainer>
  );
};

export default GithubCommitGraph;
