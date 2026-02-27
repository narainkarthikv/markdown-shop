/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  buttonHoverVariants,
  sectionVariants,
  textRevealVariants,
} from './animations';

const heroStats = [
  { label: 'Templates', value: '40+' },
  { label: 'Badges', value: '120+' },
  { label: 'Icons', value: '300+' },
];

const highlights = [
  'Templates tuned for apps and libraries',
  'Badges, stats, and icons in one flow',
  'Export clean Markdown in minutes',
];

const HeroSection = () => {
  const theme = useTheme();

  return (
    <motion.section
      initial='hidden'
      animate='visible'
      variants={sectionVariants}
      style={{ width: '100%' }}
      aria-label='Hero Section'>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 14 },
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              theme.palette.mode === 'dark'
                ? 'radial-gradient(1200px 600px at 10% -20%, rgba(59, 130, 246, 0.18), transparent 60%), radial-gradient(800px 500px at 90% 0%, rgba(14, 165, 233, 0.14), transparent 60%)'
                : 'radial-gradient(1200px 600px at 10% -20%, rgba(37, 99, 235, 0.16), transparent 60%), radial-gradient(800px 500px at 90% 0%, rgba(56, 189, 248, 0.16), transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div variants={textRevealVariants} custom={0}>
                <Chip
                  label='New: curated templates + stats'
                  color='primary'
                  variant='outlined'
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    borderRadius: 999,
                    bgcolor: theme.palette.action.hover,
                  }}
                />
              </motion.div>

              <motion.div variants={textRevealVariants} custom={1}>
                <Typography
                  component='h1'
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.4rem', md: '3.6rem', lg: '4rem' },
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    mb: 2,
                  }}>
                  Build a{' '}
                  <Box
                    component='span'
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 800,
                    }}>
                    README
                  </Box>{' '}
                  that feels polished, fast, and credible
                </Typography>
              </motion.div>

              <motion.div variants={textRevealVariants} custom={2}>
                <Typography
                  variant='body1'
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    maxWidth: 520,
                    mb: 3,
                  }}>
                  Structure your README with confidence. Build clean,
                  ready-to-publish documentation using guided templates and live
                  previews.
                </Typography>
              </motion.div>

              <motion.div variants={textRevealVariants} custom={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component={Link}
                    to='/shop'
                    variant='contained'
                    color='primary'
                    size='large'
                    sx={{ px: 3.5, borderRadius: 3 }}>
                    Start Building
                  </Button>
                  <Button
                    component={Link}
                    to='/templates'
                    variant='outlined'
                    color='primary'
                    size='large'
                    sx={{ px: 3.5, borderRadius: 3 }}>
                    Browse Templates
                  </Button>
                </Stack>
              </motion.div>

              <Stack
                direction='row'
                spacing={2}
                sx={{ mt: 4, flexWrap: 'wrap', gap: 2 }}>
                {heroStats.map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{
                      px: 2.5,
                      py: 1.2,
                      borderRadius: 999,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: theme.palette.background.paper,
                      minWidth: 120,
                    }}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: theme.palette.text.secondary }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                variants={buttonHoverVariants}
                whileHover='hover'
                whileTap='tap'>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.default,
                    boxShadow: theme.shadows[2],
                  }}>
                  <Typography
                    variant='overline'
                    sx={{ letterSpacing: '0.2em' }}>
                    README SHOP
                  </Typography>
                  <Typography
                    variant='h4'
                    sx={{ fontWeight: 700, mt: 1, mb: 1 }}>
                    A modern README, ready to ship
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                    See how your README looks with badges, stats, and a clear
                    structure.
                  </Typography>
                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    {highlights.map((item) => (
                      <Box
                        key={item}
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                          alignItems: 'center',
                        }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                          }}
                        />
                        <Typography
                          variant='body2'
                          sx={{ color: theme.palette.text.secondary }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Box
                    sx={{
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 3,
                      p: 2,
                      fontFamily: theme.typography.fontFamily,
                    }}>
                    <Typography
                      variant='caption'
                      sx={{ color: theme.palette.text.secondary }}>
                      README.md
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 600, mt: 1 }}>
                      # Project Overview
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: theme.palette.text.secondary }}>
                      Fast setup, clean structure, and clear next steps.
                    </Typography>
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
