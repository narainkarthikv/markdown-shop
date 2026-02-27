import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import CardContainer from '@/components/ui/CardContainer';
import DualActionButton from '@/components/ui/DualActionButton.jsx';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import { getGithubUser } from '../utils/githubUser';

const buildProfileViewsMarkdown = (userName) =>
  `<img src="https://komarev.com/ghpvc/?username=${userName}&color=blueviolet&style=flat-square&label=Profile+Views" alt="Profile Views" />`;

const ProfileViewsCounter = () => {
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const profileViewsMarkdown = useMemo(
    () => buildProfileViewsMarkdown(resolvedUserName),
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
          Profile Views Counter
        </Typography>

        <DualActionButton
          content={profileViewsMarkdown}
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
          src={`https://komarev.com/ghpvc/?username=${resolvedUserName}&color=blueviolet&style=flat-square&label=Profile+Views`}
          alt={`Profile view counter for ${resolvedUserName}`}
          style={{ height: 28 }}
        />
      </Box>
    </CardContainer>
  );
};

export default ProfileViewsCounter;
