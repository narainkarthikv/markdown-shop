import {
  Typography,
  Stack,
  Button,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import { useMemo } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import { getGithubRepo, getGithubUser } from '../utils/githubUser';

const REPO_NAME = 'readme-shop';

const buildContributorsMarkdown = (repo) =>
  `<img src="https://contrib.rocks/image?repo=${repo}" alt="Contributors" style="width:100%;max-width:600px;border-radius:8px;" />`;

const GithubContributors = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const repo = useMemo(
    () => getGithubRepo(resolvedUserName, REPO_NAME),
    [resolvedUserName]
  );
  const contributorsMarkdown = useMemo(
    () => buildContributorsMarkdown(repo),
    [repo]
  );

  const handleClick = () => embedMarkdown(contributorsMarkdown);

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
      aria-label='Insert contributors'>
      <Typography
        variant='h6'
        sx={{
          mb: 1.5,
          fontWeight: 600,
          textAlign: 'center',
          fontSize: '1.125rem',
        }}>
        Contributors
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Box
          component='img'
          src={`https://contrib.rocks/image?repo=${repo}`}
          alt='Repository contributors'
          sx={{ width: '100%', maxWidth: 500, borderRadius: 1 }}
        />
      </Box>

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
              window.open(`https://github.com/${repo}`, '_blank', 'noopener');
            }}
            aria-label='Open repository'>
            <OpenInNewIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Stack>
    </CardContainer>
  );
};

export default GithubContributors;
