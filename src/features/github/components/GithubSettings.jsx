import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  IconButton,
  FormControlLabel,
  Tooltip,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Refresh from '@mui/icons-material/Refresh';
import CardContainer from '@/components/ui/CardContainer';
import useGithub from '../useGithub';
const GithubSettings = () => {
  const {
    tokenConfigured,
    saveToken,
    removeToken,
    remaining,
    storedUserName,
    userName,
    refresh,
    loading,
  } = useGithub();
  const [usernameEntry, setUsernameEntry] = useState(storedUserName || '');
  const [entry, setEntry] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');
  const handleSave = () => {
    if (!entry.trim()) return;
    saveToken(entry, remember);
    setEntry('');
    setMessage(
      'Token added. It will be kept in memory for this session' +
        (remember ? ' and saved in this browser.' : '.')
    );
  };
  return (
    <CardContainer
      sx={{ p: 2.5, mb: 3 }}
      component='section'
      aria-labelledby='github-settings-title'>
      <Typography id='github-settings-title' variant='h6'>
        Load GitHub components
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
        Enter a GitHub username, then select Update components to load its
        public profile and repository data. Nothing is requested until you do.
      </Typography>
      <Stack
        component='form'
        onSubmit={(event) => {
          event.preventDefault();
          refresh(usernameEntry);
        }}
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ sm: 'flex-start' }}
        sx={{ mb: 2 }}>
        <TextField
          label='GitHub username'
          value={usernameEntry}
          onChange={(event) => setUsernameEntry(event.target.value)}
          size='small'
          fullWidth
          autoComplete='off'
          placeholder='e.g. octocat'
        />
        <Stack direction='row' spacing={0.5} alignItems='center'>
          <Button
            type='submit'
            variant='contained'
            startIcon={<Refresh />}
            disabled={!usernameEntry.trim() || loading}
            sx={{ whiteSpace: 'nowrap', minHeight: 40 }}>
            {loading ? 'Updating…' : 'Update components'}
          </Button>
          <Tooltip title='Loads public GitHub data only when you select Update components. Select it again to refresh.'>
            <IconButton aria-label='About updating GitHub components'>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {userName && (
        <Typography
          variant='caption'
          color='text.secondary'
          display='block'
          sx={{ mb: 2 }}>
          Showing components for @{userName}
        </Typography>
      )}
      <Typography variant='subtitle2' sx={{ mb: 0.5 }}>
        Optional personal access token
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
        A token raises the API rate limit and can access data its permissions
        allow.
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems={{ md: 'flex-start' }}>
        <TextField
          label='Personal access token'
          type='password'
          autoComplete='new-password'
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          size='small'
          fullWidth
          helperText={
            tokenConfigured
              ? 'A token is configured. Its value is never shown here.'
              : 'Optional. Requests go directly from this browser to api.github.com.'
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
          }
          label='Remember on this device'
        />
        <Button
          variant='contained'
          onClick={handleSave}
          disabled={!entry.trim()}>
          Use token
        </Button>
        {tokenConfigured && (
          <Button
            onClick={() => {
              removeToken();
              setMessage('Token removed.');
            }}>
            Remove token
          </Button>
        )}
      </Stack>
      {(message || remaining !== null) && (
        <Typography
          role='status'
          variant='caption'
          display='block'
          sx={{ mt: 1 }}>
          {message}
          {remaining !== null ? ' API requests remaining: ' + remaining : ''}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant='subtitle2'>Create a fine-grained token</Typography>
        <Typography variant='body2'>
          On GitHub, open Settings → Developer settings → Personal access tokens
          → Fine-grained tokens → Generate new token. Give it a recognizable
          name and expiration; choose the minimum repository access and
          permissions needed. Public repository data works without a PAT.
          Private repository data requires suitable read access. See GitHub’s{' '}
          <Link
            href='https://docs.github.com/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
            target='_blank'
            rel='noreferrer'>
            Managing your personal access tokens guide
          </Link>
          .
        </Typography>
      </Box>
      <Alert severity='warning' sx={{ mt: 2 }}>
        The token stays in this browser and is sent only in the Authorization
        header directly to GitHub. By default it is session-only; “Remember on
        this device” saves it in localStorage. Remove it here to clear the saved
        copy. Browser-only apps cannot protect a token from extensions or anyone
        with access to this device. Exported Markdown is viewed elsewhere and
        cannot use a token stored in this browser.
      </Alert>
    </CardContainer>
  );
};
export default GithubSettings;
