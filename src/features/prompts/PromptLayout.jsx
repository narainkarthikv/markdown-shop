import PropTypes from 'prop-types';
import { Box, Container, Paper, useTheme } from '@mui/material';
import ModernSection from '@/components/ui/ModernSection';
import PromptGrid from './components/PromptGrid';

const PromptLayout = ({ children }) => {
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
        <ModernSection
          title='AI Prompt Gallery'
          description='Browse reusable structured prompt templates for coding, debugging, content generation, and AI workflows.'
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
            <PromptGrid />
          </Paper>
        </ModernSection>

        {children}
      </Container>
    </Box>
  );
};

PromptLayout.propTypes = {
  children: PropTypes.node,
};

export default PromptLayout;
