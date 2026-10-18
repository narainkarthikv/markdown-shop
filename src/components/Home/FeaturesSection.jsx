import { useState } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { cardVariants, floatVariants, staggerVariants } from './animations';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';

const features = [
  {
    title: 'README templates',
    description:
      'Start from reusable project, profile, contribution, support, and feature templates instead of a blank file.',
    icon: '01',
    detail:
      'Use templates when you need a clean baseline for install steps, feature summaries, contribution notes, support links, and project metadata.',
  },
  {
    title: 'Prompt gallery',
    description:
      'Copy structured prompts for README rewrites, release notes, debugging, product copy, and documentation workflows.',
    icon: '02',
    detail:
      'The prompt library gives you a better starting point when you want AI help but still need clear inputs and predictable output.',
  },
  {
    title: 'Badges and icons',
    description:
      'Add Shields badges, skill icons, banners, license signals, issues, forks, and release markers.',
    icon: '03',
    detail:
      'Use visual signals to communicate tech stack, project health, community status, and repository metadata quickly.',
  },
  {
    title: 'Live markdown preview',
    description:
      'Edit and preview side-by-side with sanitized HTML so you can catch formatting issues before publishing.',
    icon: '04',
    detail:
      'The builder keeps writing and reviewing together, which is useful when README structure changes frequently.',
  },
  {
    title: 'GitHub components',
    description:
      'Generate activity graphs, streaks, repo pins, trophies, followers, profile views, and metrics snippets.',
    icon: '05',
    detail:
      'These components are useful for profile READMEs and open-source repos that need social proof or activity context.',
  },
  {
    title: 'Copy and export',
    description:
      'Copy clean Markdown or embed snippets quickly when your README is ready.',
    icon: '06',
    detail:
      'The output is meant to move directly into GitHub, docs, issues, discussions, or any Markdown-based publishing flow.',
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
          borderRadius: 'var(--ms-radius-2xl)',
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}>
        <motion.div variants={floatVariants} animate='animate'>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 'var(--ms-radius-xl)',
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
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <Section aria-label='Features Section'>
      <SectionTitle>Current Markdown Shop features</SectionTitle>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          maxWidth: 640,
          mx: 'auto',
          mb: 5,
        }}>
        Use Markdown Shop to assemble project READMEs, GitHub profile pages,
        contributor docs, and reusable Markdown snippets from one focused
        workspace.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          borderRadius: 'var(--ms-radius-2xl)',
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} md={5}>
            <Stack spacing={1}>
              {features.map((feature) => (
                <Button
                  key={feature.title}
                  type='button'
                  variant={
                    activeFeature.title === feature.title
                      ? 'contained'
                      : 'outlined'
                  }
                  color='primary'
                  onClick={() => setActiveFeature(feature)}
                  sx={{
                    justifyContent: 'flex-start',
                    borderRadius: 'var(--ms-radius-xl)',
                    minHeight: 44,
                  }}>
                  {feature.icon}. {feature.title}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant='h5' sx={{ fontWeight: 700, mb: 1 }}>
              {activeFeature.title}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: theme.palette.text.secondary, mb: 2 }}>
              {activeFeature.detail}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: theme.palette.text.secondary,
                p: 2,
                borderRadius: 'var(--ms-radius-xl)',
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.default,
              }}>
              {activeFeature.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

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
