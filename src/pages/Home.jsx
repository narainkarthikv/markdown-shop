import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowForwardRounded,
  AutoAwesomeRounded,
  CodeRounded,
  DataObjectRounded,
  DescriptionRounded,
  GitHub,
  InsightsRounded,
  LayersRounded,
  LockOpenRounded,
  PaletteRounded,
  SpeedRounded,
  ViewQuiltRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const navigation = [
  { label: 'Templates', to: '/templates' },
  { label: 'Components', to: '/components' },
  { label: 'Prompts', to: '/prompts' },
];

const features = [
  {
    icon: <DescriptionRounded />,
    title: 'README workspace',
    description:
      'Write in Markdown, organize sections, and see the rendered result as you edit.',
    to: '/shop',
    label: 'Open builder',
  },
  {
    icon: <ViewQuiltRounded />,
    title: 'Ready-to-use templates',
    description:
      'Start with practical layouts for projects, profiles, releases, and contributors.',
    to: '/templates',
    label: 'Explore templates',
  },
  {
    icon: <GitHub />,
    title: 'GitHub profile components',
    description:
      'Create profile stats, activity visuals, badges, and tech stack snippets.',
    to: '/components',
    label: 'Browse components',
  },
  {
    icon: <AutoAwesomeRounded />,
    title: 'Useful writing prompts',
    description:
      'Find focused prompts for clearer project descriptions and documentation.',
    to: '/prompts',
    label: 'View prompts',
  },
];

const workflow = [
  {
    number: '01',
    title: 'Choose a starting point',
    description: 'Pick a template, a component, or a blank README draft.',
  },
  {
    number: '02',
    title: 'Shape the content',
    description: 'Add your details and review the live Markdown preview.',
  },
  {
    number: '03',
    title: 'Copy it into GitHub',
    description: 'Take clean Markdown with you—no account or setup required.',
  },
];

const Home = React.memo(() => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component='main'
      sx={{ overflow: 'hidden' }}
      aria-label='Markdown Shop home'>
      <Helmet>
        <title>Markdown Shop — Build a better GitHub README</title>
        <meta
          name='description'
          content='Create a polished GitHub README with practical templates, profile components, writing prompts, and a live Markdown preview.'
        />
        <meta
          name='keywords'
          content='README builder, GitHub profile README, Markdown templates, GitHub components, documentation'
        />
        <meta
          property='og:title'
          content='Markdown Shop — Build a better GitHub README'
        />
        <meta
          property='og:description'
          content='A focused workspace for writing, previewing, and assembling GitHub README content.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://markdownshop.netlify.app' />
        <meta property='og:image' content='/favicon.svg' />
      </Helmet>

      <Box
        component='header'
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}>
        <Container maxWidth='lg'>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={2}
            sx={{ minHeight: { xs: 64, sm: 72 }, py: 1 }}>
            <Stack direction='row' alignItems='center' spacing={1.25}>
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--ms-radius-lg)',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}>
                <DataObjectRounded fontSize='small' />
              </Box>
              <Typography variant='subtitle1' sx={{ fontWeight: 750 }}>
                Markdown Shop
              </Typography>
            </Stack>
            <Stack
              component='nav'
              direction='row'
              alignItems='center'
              spacing={{ xs: 0.25, sm: 1 }}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              aria-label='Main navigation'>
              {navigation.map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  color='inherit'
                  size='small'
                  sx={{
                    minWidth: 0,
                    px: { xs: 1, sm: 1.5 },
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                  }}>
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Button
              component={Link}
              to='/shop'
              variant='contained'
              size='small'
              endIcon={<ArrowForwardRounded />}
              sx={{ ml: 'auto', whiteSpace: 'nowrap' }}>
              <Box
                component='span'
                sx={{ display: { xs: 'inline', sm: 'none' } }}>
                Build
              </Box>
              <Box
                component='span'
                sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Open builder
              </Box>
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box
        component='section'
        aria-labelledby='home-hero-title'
        sx={{
          position: 'relative',
          py: { xs: 6, sm: 8, lg: 11 },
          background: isDark
            ? 'radial-gradient(ellipse at 75% 0%, rgba(59,130,246,.12), transparent 48%)'
            : 'radial-gradient(ellipse at 75% 0%, rgba(59,130,246,.09), transparent 48%)',
        }}>
        <Container maxWidth='lg'>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'minmax(0, 1.04fr) minmax(0, .96fr)',
              },
              alignItems: 'center',
              gap: { xs: 5, md: 6, lg: 9 },
            }}>
            <Box sx={{ minWidth: 0 }}>
              <Chip
                icon={<GitHub />}
                label='A README toolkit for developers'
                variant='outlined'
                sx={{
                  mb: 2.5,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  '& .MuiChip-icon': { color: 'text.secondary' },
                }}
              />
              <Typography
                id='home-hero-title'
                component='h1'
                sx={{
                  maxWidth: 680,
                  fontWeight: 800,
                  fontSize: { xs: '2.65rem', sm: '3.5rem', lg: '4.25rem' },
                  letterSpacing: '-.055em',
                  lineHeight: 1.04,
                  textWrap: 'balance',
                }}>
                Build better project docs,{' '}
                <Box component='span' sx={{ color: 'primary.main' }}>
                  without the busywork.
                </Box>
              </Typography>
              <Typography
                sx={{
                  mt: 2.5,
                  maxWidth: 590,
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.7,
                }}>
                Bring your project story, profile details, and useful GitHub
                visuals together. Write, preview, and copy clean Markdown from
                one calm workspace.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{ mt: 3.5 }}>
                <Button
                  component={Link}
                  to='/shop'
                  variant='contained'
                  size='large'
                  endIcon={<ArrowForwardRounded />}
                  sx={{ minHeight: 48, px: 2.5 }}>
                  Start building
                </Button>
                <Button
                  component={Link}
                  to='/templates'
                  variant='outlined'
                  size='large'
                  sx={{ minHeight: 48, px: 2.5 }}>
                  Explore templates
                </Button>
              </Stack>
              <Stack
                direction='row'
                spacing={{ xs: 1.5, sm: 2.5 }}
                useFlexGap
                flexWrap='wrap'
                sx={{ mt: 3.5, color: 'text.secondary' }}>
                {[
                  [<LockOpenRounded key='icon' />, 'Free to use'],
                  [<SpeedRounded key='icon' />, 'No setup required'],
                  [<CodeRounded key='icon' />, 'Markdown you own'],
                ].map(([icon, label]) => (
                  <Stack
                    key={label}
                    direction='row'
                    alignItems='center'
                    spacing={0.75}>
                    <Box
                      sx={{
                        display: 'flex',
                        color: 'primary.main',
                        '& svg': { fontSize: 17 },
                      }}>
                      {icon}
                    </Box>
                    <Typography variant='caption' sx={{ fontWeight: 600 }}>
                      {label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Paper
              elevation={0}
              aria-label='Preview of the README workspace'
              sx={{
                minWidth: 0,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 'var(--ms-radius-2xl)',
                bgcolor: 'background.paper',
                boxShadow: isDark
                  ? '0 24px 70px rgba(0,0,0,.28)'
                  : '0 24px 70px rgba(28,48,80,.12)',
              }}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{
                  px: 2,
                  py: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Box sx={{ display: 'flex', color: 'primary.main' }}>
                    <LayersRounded fontSize='small' />
                  </Box>
                  <Typography variant='body2' sx={{ fontWeight: 700 }}>
                    README workspace
                  </Typography>
                </Stack>
                <Chip
                  label='Live preview'
                  size='small'
                  color='success'
                  variant='outlined'
                />
              </Stack>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'minmax(0, 1fr)',
                    sm: 'minmax(0, 1fr) minmax(0, 1fr)',
                  },
                  minHeight: { xs: 310, sm: 350 },
                }}>
                <Box
                  sx={{
                    minWidth: 0,
                    p: { xs: 2, sm: 2.5 },
                    bgcolor: isDark
                      ? 'rgba(255,255,255,.018)'
                      : 'rgba(15,23,42,.018)',
                    borderRight: { sm: '1px solid' },
                    borderBottom: { xs: '1px solid', sm: 0 },
                    borderColor: 'divider',
                  }}>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={0.75}
                    sx={{ mb: 2.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#f87171',
                      }}
                    />
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#fbbf24',
                      }}
                    />
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#34d399',
                      }}
                    />
                    <Typography
                      variant='caption'
                      sx={{ ml: 1, color: 'text.secondary' }}>
                      README.md
                    </Typography>
                  </Stack>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      color: 'primary.main',
                      fontFamily: 'var(--ms-font-mono)',
                      fontWeight: 700,
                    }}>
                    # Acme Project
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      mt: 1,
                      color: 'text.secondary',
                      fontFamily: 'var(--ms-font-mono)',
                    }}>
                    A clear introduction to your project.
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      mt: 2.5,
                      color: 'primary.main',
                      fontFamily: 'var(--ms-font-mono)',
                      fontWeight: 700,
                    }}>
                    ## Getting started
                  </Typography>
                  <Box
                    sx={{
                      mt: 1.25,
                      p: 1.25,
                      borderRadius: 'var(--ms-radius-md)',
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}>
                    <Typography
                      variant='caption'
                      sx={{
                        color: 'text.secondary',
                        fontFamily: 'var(--ms-font-mono)',
                      }}>
                      npm install acme-project
                    </Typography>
                  </Box>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      mt: 2.5,
                      color: 'primary.main',
                      fontFamily: 'var(--ms-font-mono)',
                      fontWeight: 700,
                    }}>
                    ## Features
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      mt: 1,
                      color: 'text.secondary',
                      fontFamily: 'var(--ms-font-mono)',
                    }}>
                    - Simple setup · Clear docs
                  </Typography>
                </Box>
                <Box sx={{ minWidth: 0, p: { xs: 2, sm: 2.5 } }}>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={0.75}
                    sx={{ mb: 2.5, color: 'text.secondary' }}>
                    <InsightsRounded fontSize='small' />
                    <Typography variant='caption' sx={{ fontWeight: 700 }}>
                      Preview
                    </Typography>
                  </Stack>
                  <Typography variant='h6' sx={{ fontWeight: 750 }}>
                    Acme Project
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      mt: 0.75,
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}>
                    A clear introduction to your project.
                  </Typography>
                  <Stack direction='row' spacing={0.75} sx={{ mt: 1.5 }}>
                    <Chip label='npm' size='small' variant='outlined' />
                    <Chip label='MIT' size='small' variant='outlined' />
                  </Stack>
                  <Typography
                    variant='subtitle2'
                    sx={{ mt: 2.5, fontWeight: 700 }}>
                    Getting started
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                    Install and run your project in minutes.
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    sx={{ mt: 2.5, fontWeight: 700 }}>
                    Features
                  </Typography>
                  <Stack spacing={0.75} sx={{ mt: 0.75 }}>
                    {['Simple setup', 'Clear documentation'].map((label) => (
                      <Stack
                        key={label}
                        direction='row'
                        spacing={0.75}
                        alignItems='center'>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                          }}
                        />
                        <Typography variant='caption' color='text.secondary'>
                          {label}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>
              <Stack
                direction='row'
                alignItems='center'
                spacing={1}
                sx={{
                  px: 2,
                  py: 1.25,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.default',
                }}>
                <PaletteRounded sx={{ color: 'primary.main', fontSize: 17 }} />
                <Typography variant='caption' color='text.secondary'>
                  Your content stays yours. Copy it straight to GitHub.
                </Typography>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </Box>

      <Box
        component='section'
        aria-labelledby='home-features-title'
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}>
        <Container maxWidth='lg'>
          <Stack spacing={1} sx={{ mb: { xs: 3.5, md: 4.5 }, maxWidth: 620 }}>
            <Typography
              variant='overline'
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '.12em',
              }}>
              Everything in one place
            </Typography>
            <Typography
              id='home-features-title'
              component='h2'
              variant='h3'
              sx={{
                fontWeight: 750,
                letterSpacing: '-.035em',
                textWrap: 'balance',
              }}>
              The pieces for a README people can use.
            </Typography>
            <Typography color='text.secondary'>
              A small set of focused tools to help you explain, present, and
              maintain your project.
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
              gap: 2,
            }}>
            {features.map((feature) => (
              <Paper
                key={feature.title}
                component={Link}
                to={feature.to}
                elevation={0}
                sx={{
                  p: 2.5,
                  minWidth: 0,
                  minHeight: 210,
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 'var(--ms-radius-xl)',
                  bgcolor: 'background.default',
                  transition:
                    'border-color var(--ms-duration-fast) var(--ms-easing-standard), background-color var(--ms-duration-fast) var(--ms-easing-standard)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2,
                  },
                }}>
                <Box
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 42,
                    height: 42,
                    mb: 2,
                    borderRadius: 'var(--ms-radius-lg)',
                    bgcolor: 'action.hover',
                    color: 'primary.main',
                    '& svg': { fontSize: 22 },
                  }}>
                  {feature.icon}
                </Box>
                <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                  {feature.title}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ mt: 0.75, color: 'text.secondary', lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={0.5}
                  sx={{ mt: 'auto', pt: 2, color: 'primary.main' }}>
                  <Typography variant='caption' sx={{ fontWeight: 700 }}>
                    {feature.label}
                  </Typography>
                  <ArrowForwardRounded sx={{ fontSize: 16 }} />
                </Stack>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      <Box
        component='section'
        aria-labelledby='home-workflow-title'
        sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth='lg'>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'minmax(0, .8fr) minmax(0, 1.2fr)',
              },
              gap: { xs: 3, md: 7 },
              alignItems: 'start',
            }}>
            <Box>
              <Typography
                variant='overline'
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '.12em',
                }}>
                A simple workflow
              </Typography>
              <Typography
                id='home-workflow-title'
                component='h2'
                variant='h3'
                sx={{
                  mt: 1,
                  fontWeight: 750,
                  letterSpacing: '-.035em',
                  textWrap: 'balance',
                }}>
                From a blank page to a README you’re ready to share.
              </Typography>
              <Typography
                sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.7 }}>
                Stay focused on your project. Markdown Shop handles the
                structure and preview so you can spend less time formatting.
              </Typography>
            </Box>
            <Stack spacing={1.5}>
              {workflow.map((step) => (
                <Paper
                  key={step.number}
                  elevation={0}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '48px minmax(0, 1fr)',
                    gap: 1.5,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 'var(--ms-radius-xl)',
                    bgcolor: 'background.paper',
                  }}>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      color: 'primary.main',
                      fontWeight: 800,
                      fontFamily: 'var(--ms-font-mono)',
                    }}>
                    {step.number}
                  </Typography>
                  <Box>
                    <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                      {step.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ mt: 0.5, color: 'text.secondary' }}>
                      {step.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box
        component='section'
        aria-label='Get started'
        sx={{ pb: { xs: 6, md: 8 } }}>
        <Container maxWidth='lg'>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              justifyContent: 'space-between',
              gap: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 'var(--ms-radius-2xl)',
              bgcolor: isDark ? 'background.paper' : 'rgba(59,130,246,.055)',
            }}>
            <Box sx={{ maxWidth: 650 }}>
              <Typography
                variant='h4'
                sx={{ fontWeight: 750, letterSpacing: '-.03em' }}>
                Make your project easier to understand.
              </Typography>
              <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                Start with a blank draft or choose a template. Your README is
                ready when you are.
              </Typography>
            </Box>
            <Button
              component={Link}
              to='/shop'
              variant='contained'
              size='large'
              endIcon={<ArrowForwardRounded />}
              sx={{ minHeight: 48, flexShrink: 0 }}>
              Open README builder
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
});

Home.displayName = 'Home';

export default Home;
