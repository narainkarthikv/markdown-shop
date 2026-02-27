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

const buildMetricsMarkdown = (userName) =>
  `<img src="https://metrics.lecoq.io/${userName}?template=classic&config.timezone=America%2FNew_York" alt="GitHub Metrics" style="width:100%;border-radius:8px;" />`;

const GithubMetrics = () => {
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const metricsMarkdown = useMemo(
    () => buildMetricsMarkdown(resolvedUserName),
    [resolvedUserName]
  );

  const handleClick = () => embedMarkdown(metricsMarkdown);

  const openInNewTab = () => {
    window.open('https://github.com/lowlighter/metrics', '_blank', 'noopener');
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
      aria-label='Insert GitHub metrics'>
      <Typography
        variant='h6'
        sx={{
          mb: 1.5,
          fontWeight: 600,
          textAlign: 'center',
          fontSize: '1.125rem',
        }}>
        GitHub Metrics
      </Typography>

      <Box
        component='img'
        src={`https://metrics.lecoq.io/${resolvedUserName}?template=classic&config.timezone=America%2FNew_York`}
        alt={`Detailed GitHub metrics for ${resolvedUserName}`}
        sx={{
          width: '100%',
          maxWidth: 600,
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

        <Tooltip title='Learn more about GitHub Metrics'>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              openInNewTab();
            }}
            aria-label='Learn more about GitHub Metrics'>
            <OpenInNewIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Stack>
    </CardContainer>
  );
};

export default GithubMetrics;
