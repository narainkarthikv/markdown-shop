import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { sectionVariants } from './animations';
import Section from './components/Section';

const CtaSection = () => {
  const theme = useTheme();

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      style={{ width: '100%' }}
      aria-label='Call to Action Section'>
      <Section>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 'var(--ms-radius-3xl)',
            border: `1px solid ${theme.palette.divider}`,
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)'
                : 'linear-gradient(135deg, rgba(239, 246, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
          }}>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12} md={7}>
              <Typography variant='h3' sx={{ fontWeight: 700, mb: 1.5 }}>
                Ready to turn project notes into publishable Markdown?
              </Typography>
              <Typography
                variant='body1'
                sx={{ color: theme.palette.text.secondary }}>
                Start with the builder, pull in templates and GitHub components,
                preview the result, then copy the Markdown where your project
                lives.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ md: 'flex-end' }}>
                <Button
                  component={Link}
                  to='/shop'
                  variant='contained'
                  color='primary'
                  sx={{ px: 3.5, borderRadius: 'var(--ms-radius-2xl)' }}>
                  Open Builder
                </Button>
                <Button
                  component={Link}
                  to='/templates'
                  variant='outlined'
                  color='primary'
                  sx={{ px: 3.5, borderRadius: 'var(--ms-radius-2xl)' }}>
                  View Templates
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Section>
    </motion.section>
  );
};

export default CtaSection;
