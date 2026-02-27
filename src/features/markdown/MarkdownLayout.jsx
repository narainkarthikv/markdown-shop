import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import useMarkdownStore from './store/markdownStore';

const MarkdownLayout = () => {
  const { markdown, setMarkdown, userName, setUserName } = useMarkdownStore();

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)', // Account for navbar and padding
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        width: '100%',
      }}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1.5, md: 2 },
          mb: 2,
          borderRadius: 2,
        }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent='space-between'>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }}>
              GitHub username
            </Typography>
            <TextField
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder='octocat'
              size='small'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>@</InputAdornment>
                ),
              }}
              helperText='Used to personalize GitHub components and embeds'
            />
          </Box>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ maxWidth: 360 }}>
            Update the username once and all GitHub components refresh
            instantly.
          </Typography>
        </Stack>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          flex: 1,
          minHeight: 0, // Important for proper scrolling
        }}>
        <MarkdownEditor value={markdown} onChange={handleMarkdownChange} />
        <MarkdownPreview markdown={markdown} />
      </Box>
    </Box>
  );
};

export default MarkdownLayout;
