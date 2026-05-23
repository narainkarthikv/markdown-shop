import { Box, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { cardVariants } from './animations';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';

const guarantees = [
  {
    title: 'Local-first workflow',
    description:
      'Draft, edit, and preview in your browser with no forced accounts.',
  },
  {
    title: 'Markdown you own',
    description:
      'Export clean Markdown anytime. No lock-in, no proprietary format.',
  },
  {
    title: 'Fast by design',
    description:
      'Lightweight UI so you stay in flow while building your README.',
  },
  {
    title: 'Open-source ethos',
    description: 'Built for the community with transparent, inspectable code.',
  },
  {
    title: 'Contributor-ready',
    description:
      'Structure that invites collaboration and sets expectations clearly.',
  },
  {
    title: 'Quality signals',
    description: 'Badges and stats add instant credibility to your project.',
  },
];

const TrustSection = () => {
  const theme = useTheme();

  return (
    <Section aria-label='Trust Section'>
      <SectionTitle>Built for open-source trust</SectionTitle>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          maxWidth: 640,
          mx: 'auto',
          mb: 5,
        }}>
        Markdown Shop respects your work: no lock-in, no noisy marketing, just
        clean documentation that earns confidence.
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
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
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
