import { Link, useLocation } from 'react-router-dom';
import { useShopStore } from '../store/useShopStore';
import {
  DarkModeRounded,
  DataObjectRounded,
  ShoppingBagOutlined,
  WbSunnyRounded,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

const primaryLinks = [
  { label: 'Templates', path: '/templates' },
  { label: 'Components', path: '/components' },
  { label: 'Prompts', path: '/prompts' },
];

const Navbar = () => {
  const themeMode = useShopStore((state) => state.themeMode);
  const setThemeMode = useShopStore((state) => state.setThemeMode);
  const theme = useTheme();
  const location = useLocation();
  const isDark = themeMode === 'dark';

  const toggleTheme = () => setThemeMode(isDark ? 'light' : 'dark');

  return (
    <AppBar
      component='header'
      position='sticky'
      elevation={0}
      sx={{
        color: 'text.primary',
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'rgba(10, 16, 28, .88)'
            : 'rgba(255, 255, 255, .88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
      }}>
      <Container maxWidth='xl'>
        <Stack
          alignItems='center'
          spacing={{ xs: 0, md: 1 }}
          sx={{ py: { xs: 1, md: 0 } }}>
          <Stack
            direction='row'
            alignItems='center'
            spacing={{ xs: 1, sm: 1.25 }}
            sx={{ minHeight: { xs: 48, md: 68 }, width: '100%' }}>
            <Stack
              component={Link}
              to='/'
              direction='row'
              alignItems='center'
              spacing={1}
              sx={{
                minWidth: 0,
                flexShrink: 0,
                color: 'text.primary',
                textDecoration: 'none',
              }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--ms-radius-md)',
                  color: 'primary.contrastText',
                  bgcolor: 'primary.main',
                }}>
                <DataObjectRounded sx={{ fontSize: 20 }} />
              </Box>
              <Typography
                variant='subtitle1'
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-.025em',
                  whiteSpace: 'nowrap',
                }}>
                Markdown Shop
              </Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={0.5}
              component='nav'
              aria-label='Main navigation'
              sx={{ ml: 3, display: { xs: 'none', md: 'flex' } }}>
              {primaryLinks.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color='inherit'
                    aria-current={active ? 'page' : undefined}
                    sx={{
                      minHeight: 40,
                      px: 1.5,
                      borderRadius: 'var(--ms-radius-lg)',
                      color: active ? 'primary.main' : 'text.secondary',
                      fontWeight: active ? 700 : 600,
                      bgcolor: active ? 'action.selected' : 'transparent',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}>
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
              <IconButton
                onClick={toggleTheme}
                aria-label={`switch to ${isDark ? 'light' : 'dark'} mode`}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--ms-radius-lg)',
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                }}>
                {isDark ? (
                  <WbSunnyRounded fontSize='small' />
                ) : (
                  <DarkModeRounded fontSize='small' />
                )}
              </IconButton>
            </Tooltip>
            <Button
              component={Link}
              to='/shop'
              aria-label='view shopping cart'
              variant='contained'
              startIcon={<ShoppingBagOutlined />}
              sx={{
                minHeight: 40,
                px: { xs: 1.25, sm: 1.75 },
                borderRadius: 'var(--ms-radius-lg)',
                whiteSpace: 'nowrap',
              }}>
              <Box
                component='span'
                sx={{ display: { xs: 'none', sm: 'inline' } }}>
                README builder
              </Box>
            </Button>
          </Stack>
          <Stack
            component='nav'
            aria-label='Main navigation'
            direction='row'
            spacing={0.75}
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
            {primaryLinks.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color='inherit'
                  size='small'
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    minHeight: 36,
                    px: 1.25,
                    flexShrink: 0,
                    borderRadius: 'var(--ms-radius-lg)',
                    color: active ? 'primary.main' : 'text.secondary',
                    fontWeight: active ? 700 : 600,
                    bgcolor: active ? 'action.selected' : 'transparent',
                  }}>
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
