import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  FormControlLabel,
  FormControl,
  Tooltip,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Refresh from '@mui/icons-material/Refresh';
import GitHub from '@mui/icons-material/GitHub';
import PersonOutline from '@mui/icons-material/PersonOutline';
import SpeedOutlined from '@mui/icons-material/SpeedOutlined';
import CardContainer from '@/components/ui/CardContainer';
import useGithub from '../useGithub';
import { useGithubTheme } from '../GithubThemeContext';
import { githubSvgThemes } from '../utils/githubSvg';

const themeAccents = {
  cyberpunk: '#ff4fd8',
  hacker: '#42ff85',
  nature: '#a7d98b',
  nostalgic: '#ffbd69',
};

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
  const { flavor, setFlavor } = useGithubTheme();
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
      sx={{ p: 0, mb: 3, '&:hover': { transform: 'none' } }}
      component='section'
      aria-labelledby='github-settings-title'>
      <Box
        component='header'
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            lg: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
          },
          alignItems: 'stretch',
          gap: { xs: 2, lg: 2.5 },
          mb: 2,
        }}>
        <Box
          sx={{
            minWidth: 0,
            minHeight: { lg: 148 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            py: { xs: 0.5, lg: 1 },
          }}>
          <Chip
            label='COMPONENT STUDIO'
            size='small'
            variant='outlined'
            sx={{
              mb: 1.25,
              height: 24,
              color: themeAccents[flavor],
              borderColor: themeAccents[flavor],
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: 1.1,
            }}
          />
          <Typography
            id='github-settings-title'
            variant='h4'
            component='h1'
            sx={{
              fontWeight: 800,
              mb: 0.75,
              letterSpacing: '-.04em',
              lineHeight: 1.08,
              fontSize: { xs: '2rem', md: '2.35rem' },
            }}>
            Make your profile{' '}
            <Box component='span' sx={{ color: themeAccents[flavor] }}>
              stand out.
            </Box>
          </Typography>
          <Typography
            color='text.secondary'
            sx={{
              lineHeight: 1.45,
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.72rem', sm: '0.82rem', lg: '0.9rem' },
              letterSpacing: '-0.01em',
            }}>
            Choose a style, load GitHub data, and build your README.
          </Typography>
        </Box>
        <Box
          sx={{
            minWidth: 0,
            minHeight: { lg: 148 },
            p: { xs: 1.5, sm: 2 },
            borderRadius: 'var(--ms-radius-feature)',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'action.hover',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={1}
            useFlexGap
            flexWrap='wrap'
            sx={{ mb: 1.25 }}>
            <Stack direction='row' alignItems='center' spacing={0.75}>
              <GitHub fontSize='small' />
              <Typography variant='subtitle2' fontWeight={700}>
                Load GitHub components
              </Typography>
              <Tooltip title='Your profile and repository data loads only after you select Update components.'>
                <IconButton size='small' aria-label='When GitHub data loads'>
                  <InfoOutlined fontSize='small' />
                </IconButton>
              </Tooltip>
            </Stack>
            <Chip
              label={userName ? 'Profile loaded' : 'Ready to load'}
              size='small'
              color={userName ? 'success' : 'default'}
              variant='outlined'
              sx={{ height: 24, fontSize: '0.7rem', flexShrink: 0 }}
            />
          </Stack>
          <Box
            component='form'
            onSubmit={(event) => {
              event.preventDefault();
              refresh(usernameEntry);
            }}
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'minmax(0, 1fr) minmax(0, 1fr)',
                sm: 'minmax(135px, 1.25fr) minmax(120px, 1fr) auto',
              },
              gap: 1,
              alignItems: 'stretch',
            }}>
            <TextField
              label='GitHub username'
              value={usernameEntry}
              onChange={(event) => setUsernameEntry(event.target.value)}
              size='small'
              autoComplete='off'
              placeholder='e.g. octocat'
              sx={{
                gridColumn: { xs: '1 / -1', sm: 'auto' },
                minWidth: 0,
                '& .MuiInputBase-root': { height: 40 },
              }}
            />
            <FormControl
              size='small'
              fullWidth
              sx={{ minWidth: 0, height: 40 }}>
              <InputLabel id='github-svg-theme-label'>SVG theme</InputLabel>
              <Select
                labelId='github-svg-theme-label'
                id='github-svg-theme'
                value={flavor}
                label='SVG theme'
                onChange={(event) => setFlavor(event.target.value)}>
                {githubSvgThemes.map((themeOption) => (
                  <MenuItem key={themeOption.id} value={themeOption.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        component='span'
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: themeAccents[themeOption.id],
                        }}
                      />
                      {themeOption.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              startIcon={<Refresh />}
              disabled={!usernameEntry.trim() || loading}
              sx={{
                whiteSpace: { sm: 'nowrap' },
                minHeight: 40,
                minWidth: 0,
                gridColumn: { xs: '1 / -1', sm: 'auto' },
                px: { xs: 1, sm: 2 },
              }}>
              {loading ? 'Updating…' : 'Update components'}
            </Button>
          </Box>
          {(userName || remaining !== null) && (
            <Stack
              direction='row'
              spacing={0.75}
              useFlexGap
              flexWrap='wrap'
              sx={{ mt: 1 }}>
              {userName && (
                <Chip
                  icon={<PersonOutline />}
                  label={`@${userName}`}
                  size='small'
                  variant='outlined'
                  color='primary'
                  sx={{
                    height: 24,
                    maxWidth: 'min(100%, 260px)',
                    '& .MuiChip-label': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  }}
                />
              )}
              {remaining !== null && (
                <Tooltip title='Remaining requests in the current GitHub API rate-limit window.'>
                  <Chip
                    icon={<SpeedOutlined />}
                    label={`${remaining} API requests remaining`}
                    size='small'
                    variant='outlined'
                    color={remaining <= 10 ? 'warning' : 'success'}
                    sx={{ height: 24 }}
                  />
                </Tooltip>
              )}
            </Stack>
          )}
          {userName && (
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
              Showing components for @{userName}
            </Typography>
          )}
        </Box>
      </Box>
      <Accordion
        disableGutters
        elevation={0}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'transparent',
          '&::before': { display: 'none' },
        }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            px: 0,
            minHeight: 44,
            '& .MuiAccordionSummary-content': { my: 1 },
          }}>
          <Typography variant='subtitle2'>
            Optional API token{tokenConfigured ? ' · configured' : ''}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            Raises the API rate limit and can access data its permissions allow.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
              gap: 1,
              alignItems: 'start',
              '& > *': { minWidth: 0 },
            }}>
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
              sx={{ minHeight: 40, mx: 0, alignItems: 'center' }}
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
              disabled={!entry.trim()}
              sx={{ minHeight: 40 }}>
              Use token
            </Button>
            {tokenConfigured && (
              <Button
                onClick={() => {
                  removeToken();
                  setMessage('Token removed.');
                }}
                sx={{ minHeight: 40 }}>
                Remove token
              </Button>
            )}
          </Box>
          {message && (
            <Typography
              role='status'
              variant='caption'
              display='block'
              sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              mt: 1,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'transparent',
              '&::before': { display: 'none' },
            }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                px: 0,
                minHeight: 44,
                '& .MuiAccordionSummary-content': { my: 1 },
              }}>
              <Typography variant='subtitle2'>Token setup & privacy</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0 }}>
              <Box>
                <Typography variant='subtitle2'>
                  Create a fine-grained token
                </Typography>
                <Typography variant='body2'>
                  On GitHub, open Settings → Developer settings → Personal
                  access tokens → Fine-grained tokens → Generate new token. Give
                  it a recognizable name and expiration; choose the minimum
                  repository access and permissions needed. Public repository
                  data works without a PAT. Private repository data requires
                  suitable read access. See GitHub’s{' '}
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
                The token stays in this browser and is sent only in the
                Authorization header directly to GitHub. By default it is
                session-only; “Remember on this device” saves it in
                localStorage. Remove it here to clear the saved copy.
                Browser-only apps cannot protect a token from extensions or
                anyone with access to this device. Exported Markdown is viewed
                elsewhere and cannot use a token stored in this browser.
              </Alert>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </CardContainer>
  );
};
export default GithubSettings;
