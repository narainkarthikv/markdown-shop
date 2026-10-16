import { Box, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { cardVariants } from './animations';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';

const guarantees = [
  {
    title: 'Browser-based workflow',
    description:
      'Draft, edit, preview, copy, and export from the web app with no forced setup step.',
  },
  {
    title: 'Markdown you own',
    description:
      'Export clean Markdown anytime. No lock-in, no proprietary format.',
  },
  {
    title: 'Theme-aware interface',
    description:
      'Light and dark modes keep the builder readable while you work across devices.',
  },
  {
    title: 'Open-source ethos',
    description: 'Built for the community with transparent, inspectable code.',
  },
  {
    title: 'Contributor-ready docs',
    description:
      'Templates help you explain contribution rules, support paths, project scope, and community expectations.',
  },
  {
    title: 'Sanitized preview',
    description:
      'Rendered Markdown is sanitized before preview so formatting stays useful without careless HTML output.',
  },
];

const TrustSection = () => {
  const theme = useTheme();

  return (
    <Section aria-label='Trust Section'>
      <SectionTitle>Built for readable open-source docs</SectionTitle>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          maxWidth: 640,
          mx: 'auto',
          mb: 5,
        }}>
        The app focuses on output you can inspect, reuse, and publish in the
        places developers already read: GitHub READMEs, profile pages, docs,
        issues, and discussions.
      </Typography>

      <Grid container spacing={3}>
        {guarantees.map((item, index) => (
          <Grid item xs={12} md={4} key={item.title}>
            <motion.div variants={cardVariants} whileHover='hover'>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 'var(--ms-radius-2xl)',
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--ms-radius-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    mb: 2,
                  }}>
                  {String(index + 1).padStart(2, '0')}
                </Box>
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: theme.palette.text.secondary }}>
                  {item.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default TrustSection;
