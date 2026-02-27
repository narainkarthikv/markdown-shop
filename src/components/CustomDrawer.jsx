import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { FaObjectGroup } from 'react-icons/fa';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const navigationItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/' },
  { label: 'Github Components', icon: <FaObjectGroup />, path: '/components' },
  { label: 'Templates', icon: <MenuBookIcon />, path: '/templates' },
];

const CustomDrawer = ({ open, onClose, currentPath }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      variant={isMobile ? 'temporary' : 'temporary'}
      PaperProps={{
        sx: {
          borderRadius: 0,
          width: { xs: 280, sm: 320 },
          bgcolor: 'background.paper',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        role='presentation'>
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 700,
              fontSize: '1.125rem',
              color: 'text.primary',
            }}>
            Navigation
          </Typography>
        </Box>

        {/* Navigation Items */}
        <List sx={{ px: 1.5, py: 2 }}>
          {navigationItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={onClose}
                sx={{
                  borderRadius: 0,
                  mb: 0.5,
                  pl: 2,
                  py: 1.25,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    transition: 'all 0.2s',
                  },
                  bgcolor: isActive ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    '&::before': {
                      bgcolor: 'primary.main',
                    },
                  },
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9375rem',
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Divider />

        {/* Footer */}
        <Box sx={{ mt: 'auto', p: 2, textAlign: 'center' }}>
          <Typography variant='caption' color='text.secondary'>
            README Shop © 2026
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

CustomDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentPath: PropTypes.string,
};

CustomDrawer.defaultProps = {
  currentPath: '/',
};

export default CustomDrawer;
