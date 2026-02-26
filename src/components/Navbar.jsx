import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShopStore } from '../store/useShopStore';
import { FaMoon, FaSun, FaShoppingCart } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Box,
} from '@mui/material';
import CustomDrawer from './CustomDrawer';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const themeMode = useShopStore((state) => state.themeMode);
  const setThemeMode = useShopStore((state) => state.setThemeMode);
  const theme = useTheme();
  const location = useLocation();

  const handleThemeToggle = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const handleDrawerToggle = () => setDrawerOpen((open) => !open);

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        borderRadius: 0,
        backdropFilter: 'blur(12px)',
        backgroundColor:
          theme.customTokens?.surfaceOverlay || theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
      }}>
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 3 },
        }}>
        {/* Left side: Menu icon */}
        <IconButton
          edge='start'
          aria-label='open navigation menu'
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}>
          <MenuIcon />
        </IconButton>

        {/* Center/Left: App name */}
        <Typography
          variant='h6'
          component={Link}
          to='/'
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            letterSpacing: '-0.5px',
            flexGrow: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 0.8,
            },
          }}>
          README SHOP
        </Typography>

        {/* Right side: Action icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            onClick={handleThemeToggle}
            aria-label={`switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}>
            {themeMode === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
          </IconButton>

          <IconButton
            component={Link}
            to='/shop'
            aria-label='view shopping cart'
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}>
            <FaShoppingCart size={18} />
          </IconButton>
        </Box>

        <CustomDrawer
          open={drawerOpen}
          onClose={handleDrawerToggle}
          currentPath={location.pathname}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
