import { Box, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { cardVariants, floatVariants, staggerVariants } from './animations';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';

const features = [
  {
    title: 'Template intelligence',
    description:
      'Curated layouts for apps, libraries, APIs, and open-source portfolios.',
    icon: '01',
  },
  {
    title: 'Prompt Gallery',
    description:
      'Reusable AI prompts for debugging, content, and product workflows.',
    icon: '02',
  },
  {
    title: 'Badges that matter',
    description:
      'Highlight releases, license, CI status, and community trust signals.',
    icon: '03',
  },
  {
    title: 'Live markdown preview',
    description:
      'Edit and preview side-by-side so you know exactly what ships.',
    icon: '04',
  },
  {
    title: 'GitHub stats blocks',
    description:
      'Drop in streaks, languages, and contribution graphs in a click.',
    icon: '05',
  },
  {
    title: 'Export without friction',
    description: 'Copy the Markdown or export assets with zero paywalls.',
    icon: '06',
  },
];

const FeatureCard = ({ feature }) => {
  const theme = useTheme();

  return (
    <motion.div variants={cardVariants} whileHover='hover' whileTap='tap'>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}>
        <motion.div variants={floatVariants} animate='animate'>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: theme.palette.action.hover,
              color: theme.palette.primary.main,
              fontWeight: 700,
              mb: 2,
            }}>
            {feature.icon}
          </Box>
        </motion.div>
        <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
          {feature.title}
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: theme.palette.text.secondary }}>
          {feature.description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const theme = useTheme();

  return (
    <Section aria-label='Features Section'>
      <SectionTitle>Everything you need for a world-class README</SectionTitle>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          maxWidth: 640,
          mx: 'auto',
          mb: 5,
        }}>
        Focus on building your project. We handle the presentation, structure,
        and polish.
      </Typography>
      <motion.div
        variants={staggerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}>
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <FeatureCard feature={feature} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Section>
  );
};

export default FeaturesSection;
