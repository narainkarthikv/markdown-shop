import { useState } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  buttonHoverVariants,
  sectionVariants,
  textRevealVariants,
} from './animations';

const productStats = [
  { label: 'Templates', value: 'README' },
  { label: 'Components', value: 'GitHub' },
  { label: 'Output', value: 'Markdown' },
];

const useCases = [
  {
    label: 'Launch a project',
    title: 'Turn a new repo into a clear product README',
    description:
      'Start from a project template, add setup steps, include license and release badges, then preview the finished README before it goes live.',
    output: [
      '# Project Name',
      '## What it does',
      'A short promise, screenshots, and the fastest path to install.',
      '## Quick start',
      'Copy-ready commands, requirements, and expected output.',
    ],
  },
  {
    label: 'Upgrade a profile',
    title: 'Build a GitHub profile that shows real activity',
    description:
      'Add stats cards, streaks, trophies, contribution graphs, followers, profile views, badges, and skill icons without hand-writing every snippet.',
    output: [
      '# Hi, I am building with React and Vite',
      '![GitHub Stats](...)',
      '![Contribution Graph](...)',
      'React | Vite | Material UI | Markdown',
    ],
  },
  {
    label: 'Write with prompts',
    title: 'Use structured prompts when the README needs sharper copy',
    description:
      'Open the prompt gallery for release notes, debugging notes, product summaries, and docs writing prompts you can adapt to your project.',
    output: [
      '# Prompt: README Rewrite',
      'Goal: make the project purpose obvious in the first 30 seconds.',
      'Input: repo summary, install steps, target audience.',
      'Output: concise sections with contributor-ready language.',
    ],
  },
];

const HeroSection = () => {
  const theme = useTheme();
  const [selectedUseCase, setSelectedUseCase] = useState(0);
  const activeUseCase = useCases[selectedUseCase];

  return (
    <motion.section
      initial='hidden'
      animate='visible'
      variants={sectionVariants}
      style={{ width: '100%' }}
      aria-label='Markdown Shop overview'>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, md: 9 },
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}>
        <Box
          sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div variants={textRevealVariants} custom={0}>
                <Typography
                  variant='overline'
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                  }}>
                  README builder for open-source projects
                </Typography>
              </motion.div>

              <motion.div variants={textRevealVariants} custom={1}>
                <Typography
                  component='h1'
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.35rem', md: '3.4rem', lg: '3.8rem' },
                    lineHeight: 1.1,
                    mb: 2,
                    maxWidth: 620,
                  }}>
                  Build, preview, and ship better project docs
                </Typography>
              </motion.div>

              <motion.div variants={textRevealVariants} custom={2}>
                <Typography
                  variant='body1'
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    maxWidth: 600,
                    mb: 3,
                  }}>
                  Markdown Shop helps you assemble professional READMEs with
                  templates, live preview, GitHub stats, badges, icons, prompt
                  templates, and copy-ready Markdown output.
                </Typography>
              </motion.div>

              <motion.div variants={textRevealVariants} custom={3}>
                <Stack
                  direction='row'
                  spacing={1.5}
                  sx={{ mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
                  {productStats.map((stat) => (
                    <Box
                      key={stat.label}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 'var(--ms-radius-xl)',
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.default,
                        minWidth: 118,
                      }}>
                      <Typography variant='body2' sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: theme.palette.text.secondary }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </motion.div>

              <motion.div variants={textRevealVariants} custom={4}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component={Link}
                    to='/shop'
                    variant='contained'
                    color='primary'
                    size='large'
                    sx={{ px: 3.5, borderRadius: 'var(--ms-radius-xl)' }}>
                    Open Builder
                  </Button>
                  <Button
                    component={Link}
                    to='/components'
                    variant='outlined'
                    color='primary'
                    size='large'
                    sx={{ px: 3.5, borderRadius: 'var(--ms-radius-xl)' }}>
                    Browse Components
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                variants={buttonHoverVariants}
                whileHover='hover'
                whileTap='tap'>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 'var(--ms-radius-2xl)',
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.default,
                    boxShadow: theme.shadows[2],
                  }}>
                  <Typography
                    variant='overline'
                    sx={{
                      color: theme.palette.text.secondary,
                      letterSpacing: '0.14em',
                    }}>
                    What do you need to create?
                  </Typography>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    sx={{ mt: 1.5, mb: 3 }}
                    role='tablist'
                    aria-label='README use cases'>
                    {useCases.map((item, index) => {
                      const isActive = selectedUseCase === index;

                      return (
                        <Button
                          key={item.label}
                          type='button'
                          role='tab'
                          aria-selected={isActive}
                          variant={isActive ? 'contained' : 'outlined'}
                          color='primary'
                          onClick={() => setSelectedUseCase(index)}
                          sx={{
                            borderRadius: 'var(--ms-radius-xl)',
                            justifyContent: 'center',
                            flex: 1,
                            minHeight: 44,
                          }}>
                          {item.label}
                        </Button>
                      );
                    })}
                  </Stack>

                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                    }}>
                    <Box>
                      <Typography variant='h5' sx={{ fontWeight: 700, mb: 1 }}>
                        {activeUseCase.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: theme.palette.text.secondary }}>
                        {activeUseCase.description}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 'var(--ms-radius-xl)',
                        p: 2,
                      }}>
                      <Typography
                        variant='caption'
                        sx={{
                          color: theme.palette.text.secondary,
                          display: 'block',
                          mb: 1,
                        }}>
                        Preview output
                      </Typography>
                      <Stack spacing={0.75}>
                        {activeUseCase.output.map((line) => (
                          <Typography
                            key={line}
                            variant='body2'
                            sx={{
                              color: line.startsWith('#')
                                ? theme.palette.text.primary
                                : theme.palette.text.secondary,
                              fontWeight: line.startsWith('#') ? 700 : 400,
                              fontFamily: line.startsWith('!')
                                ? 'monospace'
                                : theme.typography.fontFamily,
                            }}>
                            {line}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.section>
  );
};

export default HeroSection;
