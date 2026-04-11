/* eslint-disable react/prop-types */
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';

const infoItems = [
  {
    icon: 'Clarity first',
    title: 'Make projects scannable',
    description:
      'Turn complex work into a README that is easy to skim and simple to trust.',
  },
  {
    icon: 'Modular blocks',
    title: 'Build with reusable pieces',
    description:
      'Mix templates, badges, icons, and stats without rebuilding your structure.',
  },
  {
    icon: 'Export ready',
    title: 'Publish with zero cleanup',
    description:
      'Copy Markdown or export assets cleanly when you are ready to ship.',
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
        Give your open-source work a professional, trustworthy home. Build a
        README that invites contributors and makes your project feel ready for
        the spotlight.
      </Typography>

      <Grid container spacing={3}>
        {infoItems.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
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
          to='/components'
          variant='outlined'
          color='primary'>
          Explore Components
        </Button>
      </Stack>
    </Section>
  );
};

export default InfoSection;
