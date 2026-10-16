import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';

const infoItems = [
  {
    icon: 'Repos',
    title: 'Document a project',
    description:
      'Create READMEs that explain what the project does, how to install it, how to contribute, and where users get help.',
  },
  {
    icon: 'Profiles',
    title: 'Improve your GitHub profile',
    description:
      'Combine stats, trophies, contribution graphs, skill icons, profile views, followers, and repo pins into a polished profile page.',
  },
  {
    icon: 'Snippets',
    title: 'Generate reusable markdown',
    description:
      'Build badges, banners, prompt-driven copy, and Markdown blocks you can reuse across repos, issues, discussions, and docs.',
  },
];

const InfoSection = () => {
  const theme = useTheme();

  return (
    <Section aria-label='Why Markdown Shop'>
      <SectionTitle>Why Markdown Shop</SectionTitle>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          color: theme.palette.text.secondary,
          maxWidth: 640,
          mx: 'auto',
          mb: 5,
        }}>
        Markdown Shop is for developers who need project documentation that is
        fast to assemble, easy to read, and ready for GitHub without hand
        stitching every badge, stat card, and section.
      </Typography>

      <Grid container spacing={3}>
        {infoItems.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 'var(--ms-radius-2xl)',
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
              }}>
              <Typography
                variant='overline'
                sx={{
                  letterSpacing: '0.2em',
                  color: theme.palette.text.secondary,
                }}>
                {item.icon}
              </Typography>
              <Typography variant='h5' sx={{ fontWeight: 600, mt: 1, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: theme.palette.text.secondary }}>
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent='center'
        sx={{ mt: 4 }}>
        <Button component={Link} to='/shop' variant='contained' color='primary'>
          Build a README
        </Button>
        <Button
          component={Link}
          to='/prompts'
          variant='outlined'
          color='primary'>
          Open Prompt Gallery
        </Button>
      </Stack>
    </Section>
  );
};

export default InfoSection;
