/* eslint-disable react/prop-types */
import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Section from './components/Section';

const thanks = [
  {
    name: 'Ileriayo',
    url: 'https://github.com/Ileriayo',
    note: 'Markdown badges that power our badge library.',
  },
  {
    name: 'tandpfun',
    url: 'https://github.com/tandpfun',
    note: 'Skill icons that make tech stacks readable at a glance.',
  },
];

const ThanksSection = () => {
  const theme = useTheme();

  return (
    <Section aria-label='Thanks Section'>
      <Stack spacing={{ xs: 3, md: 4 }} sx={{ width: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            p: { xs: 3, md: 4 },
            textAlign: 'center',
          }}>
          <Typography
            variant='overline'
            sx={{
              letterSpacing: '0.3em',
              color: theme.palette.text.secondary,
            }}>
            OPEN-SOURCE CREDITS
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700, mb: 1.5 }}>
            Built with the open-source ecosystem
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 680,
              mb: 3,
              mx: 'auto',
            }}>
            README Shop stands on the shoulders of incredible open-source work.
            We are grateful to the projects and communities that make this
            possible.
          </Typography>
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'left' }}>
            <Stack spacing={2}>
              {thanks.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    alignItems: { sm: 'center' },
                    justifyContent: 'space-between',
                  }}>
                  <Box>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: theme.palette.text.secondary }}>
                      {item.note}
                    </Typography>
                  </Box>
                  <Link
                    href={item.url}
                    target='_blank'
                    rel='noreferrer'
                    underline='hover'
                    sx={{ fontWeight: 600 }}>
                    Learn more
                  </Link>
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            p: { xs: 3, md: 4 },
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(140deg, rgba(37, 99, 235, 0.18), rgba(16, 185, 129, 0.12))'
                : 'linear-gradient(140deg, rgba(37, 99, 235, 0.12), rgba(16, 185, 129, 0.08))',
            textAlign: 'center',
          }}>
          <Typography
            variant='overline'
            sx={{
              letterSpacing: '0.3em',
              color: theme.palette.text.secondary,
            }}>
            WISDOM FOX COMMUNITY
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700, mb: 1.5 }}>
            Support open-source craft
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 720,
              mx: 'auto',
            }}>
            README Shop is maintained by the Wisdom Fox community. If the
            project saves you time, consider fueling the next release with a
            small pledge or a coffee.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent='center'
            sx={{ mt: 3 }}>
            <Button
              component={Link}
              href='https://ko-fi.com/wisdomfox'
              target='_blank'
              rel='noreferrer'
              variant='outlined'
              color='primary'
              sx={{ px: 3, borderRadius: 3 }}>
              Buy us a coffee
            </Button>
            <Button
              component={Link}
              href='https://patreon.com/user?u=72747187'
              target='_blank'
              rel='noreferrer'
              variant='contained'
              color='primary'
              sx={{ px: 3, borderRadius: 3 }}>
              Support on Patreon
            </Button>
          </Stack>
          <Typography
            variant='caption'
            sx={{
              display: 'block',
              mt: 2,
              color: theme.palette.text.secondary,
            }}>
            Donations are optional. README Shop will always be free and open
            source.
          </Typography>
        </Paper>
      </Stack>
    </Section>
  );
};

export default ThanksSection;
