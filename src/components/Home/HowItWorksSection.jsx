import { Box, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import {
  floatVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from './animations';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';

const steps = [
  {
    title: 'Start with a template or prompt',
    description:
      'Choose Markdown Templates or AI prompts built for docs, and workflow notes.',
  },
  {
    title: 'Personalize the page',
    description:
      'Add badges, icons, stats, and rich sections with live preview feedback.',
  },
  {
    title: 'Publish with confidence',
    description:
      'Export clean Markdown, copy it instantly, and ship polished project docs.',
  },
];

const Step = ({ title, description, index, delay }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={4}>
      <motion.div
        variants={index % 2 === 0 ? slideInLeftVariants : slideInRightVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            height: '100%',
          }}>
          <motion.div variants={floatVariants} animate='animate'>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
                mb: 2,
              }}>
              {index + 1}
            </Box>
          </motion.div>
          <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
            {title}
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.secondary }}>
            {description}
          </Typography>
        </Paper>
      </motion.div>
    </Grid>
  );
};

const HowItWorksSection = () => {
  const theme = useTheme();

  return (
    <Section aria-label='How It Works Section'>
      <SectionTitle>Build in three quick steps</SectionTitle>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          maxWidth: 560,
          mx: 'auto',
          mb: 4,
        }}>
        A repeatable workflow that keeps you shipping.
      </Typography>
      <Grid container spacing={3}>
        {steps.map((step, index) => (
          <Step
            key={step.title}
            {...step}
            index={index}
            delay={0.1 * (index + 1)}
          />
        ))}
      </Grid>
    </Section>
  );
};

export default HowItWorksSection;
