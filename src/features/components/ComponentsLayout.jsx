import { Container, Box } from '@mui/material';
import PropTypes from 'prop-types';
import ComponentsGrid from './ComponentsGrid';

const ComponentsLayout = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      width: '100%',
      bgcolor: 'transparent',
    }}>
    <Container
      maxWidth='xl'
      sx={{
        py: { xs: 1, sm: 2, lg: 3 },
        px: { xs: 1.5, sm: 3, lg: 4 },
      }}>
      <Box sx={{ maxWidth: 1520, mx: 'auto', minWidth: 0 }}>{children}</Box>
      <Box
        component='section'
        aria-label='Tech stack icon selector'
        sx={{
          maxWidth: 1520,
          mx: 'auto',
          mt: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}>
        <ComponentsGrid />
      </Box>
    </Container>
  </Box>
);

ComponentsLayout.propTypes = {
  children: PropTypes.node,
};

export default ComponentsLayout;
