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

const buildSnakeMarkdown = (userName) => `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${userName}/${userName}/output/github-contribution-grid-snake-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${userName}/${userName}/output/github-contribution-grid-snake.svg">
  <img alt="GitHub contribution grid snake animation" src="https://raw.githubusercontent.com/${userName}/${userName}/output/github-contribution-grid-snake.svg">
</picture>`;

const GithubSnakeContribution = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const snakeMarkdown = useMemo(
    () => buildSnakeMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const handleClick = () => embedMarkdown(snakeMarkdown);

  const openInNewTab = () => {
    window.open('https://github.com/Platane/snk', '_blank', 'noopener');
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
      aria-label='Insert GitHub snake contribution animation'>
      <Typography
        variant='h6'
        sx={{
          mb: 1.5,
          fontWeight: 600,
          textAlign: 'center',
          fontSize: '1.125rem',
        }}>
        Contribution Snake Animation
      </Typography>

      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.default',
          borderRadius: 1,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}>
        <img
          src={`https://raw.githubusercontent.com/${resolvedUserName}/${resolvedUserName}/output/github-contribution-grid-snake.svg`}
          alt={`GitHub snake contribution animation for ${resolvedUserName}`}
          style={{
            width: '100%',
            maxWidth: 800,
            display: 'block',
          }}
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

        <Tooltip title='Learn more about Snake animation'>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              openInNewTab();
            }}
            aria-label='Learn more about contribution snake'>
            <OpenInNewIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Stack>
    </CardContainer>
  );
};

export default GithubSnakeContribution;
