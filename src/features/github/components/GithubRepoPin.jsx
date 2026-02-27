import {
  Box,
  Typography,
  Stack,
  Button,
  Tooltip,
  IconButton,
  Chip,
} from '@mui/material';
import { useMemo } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import CardContainer from '@/components/ui/CardContainer';
import { getGithubUser } from '../utils/githubUser';

const REPO_NAME = 'readme-shop';

const buildRepoPinMarkdown = (userName) =>
  `<a href="https://github.com/${userName}/${REPO_NAME}">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userName}&repo=${REPO_NAME}&theme=tokyonight&hide_border=true" alt="Repo Pin" />
</a>`;

const GithubRepoPin = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const repoPinMarkdown = useMemo(
    () => buildRepoPinMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const handleClick = () => embedMarkdown(repoPinMarkdown);

  const openInNewTab = () => {
    window.open(
      `https://github.com/${resolvedUserName}/${REPO_NAME}`,
      '_blank',
      'noopener'
    );
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
      aria-label='Insert repository pin'>
      <Typography
        variant='h6'
        sx={{
          mb: 1.5,
          fontWeight: 600,
          textAlign: 'center',
          fontSize: '1.125rem',
        }}>
        Repository Pin
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 1,
        }}>
        <a
          href={`https://github.com/${resolvedUserName}/${REPO_NAME}`}
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => e.preventDefault()}>
          <Box
            component='img'
            src={`https://github-readme-stats.vercel.app/api/pin/?username=${resolvedUserName}&repo=${REPO_NAME}&theme=tokyonight&hide_border=true`}
            alt='Repository pin card'
            sx={{
              width: '100%',
              maxWidth: 450,
              borderRadius: 1,
            }}
          />
        </a>
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

        <Tooltip title='View repository'>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              openInNewTab();
            }}
            aria-label='Open repository'>
            <OpenInNewIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Stack>
    </CardContainer>
  );
};

export default GithubRepoPin;
