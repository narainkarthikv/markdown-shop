import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import { getGithubUser } from '../utils/githubUser';

const buildFollowersMarkdown = (userName) =>
  `<img src="https://img.shields.io/github/followers/${userName}?label=Followers&style=social" alt="GitHub Followers" />`;

const GithubFollowers = () => {
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const followersMarkdown = useMemo(
    () => buildFollowersMarkdown(resolvedUserName),
    [resolvedUserName]
  );

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
          Followers Badge
        </Typography>

        <DualActionButton
          content={followersMarkdown}
          contentType='markdown'
          variant='compact'
          size='small'
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
        }}>
        <img
          src={`https://img.shields.io/github/followers/${resolvedUserName}?label=Followers&style=social`}
          alt='GitHub followers badge'
          style={{ height: 24 }}
        />
      </Box>
    </CardContainer>
  );
};

export default GithubFollowers;
