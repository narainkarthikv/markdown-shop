import { Box, Container, Paper, useTheme, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import ModernSection from '@/components/ui/ModernSection';
import TemplatesGrid from '@/components/Templates/TemplatesGrid';

/**
 * TemplatesLayout - Modern 2026+ Design
 * Features:
 * - Clean containerized layout matching Components page
 * - Proper spacing and responsive design
 * - Modern visual hierarchy
 * - Optimized for user experience
 */
const TemplatesLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'transparent',
      }}>
      <Container
        maxWidth='xl'
        sx={{
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 3 },
        }}>
        {/* Modern Section Wrapper */}
        <ModernSection
          title='README.md Templates'
          description='Choose from professionally crafted templates to kickstart your project documentation'
          variant='default'
          sx={{ mb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
            }}>
            <TemplatesGrid />
          </Paper>
        </ModernSection>

        {children}
      </Container>
    </Box>
  );
};

TemplatesLayout.propTypes = {
  children: PropTypes.node,
};

export default TemplatesLayout;
