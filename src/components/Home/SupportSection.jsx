import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Section from './components/Section';

const SupportSection = () => {
  const theme = useTheme();

  return (
    <Section aria-label='Support Section'>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          px: { xs: 3, md: 5 },
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          boxShadow: theme.shadows[1],
        }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.35,
            background:
              theme.palette.mode === 'dark'
                ? 'radial-gradient(600px 240px at 20% -10%, rgba(59, 130, 246, 0.2), transparent 60%)'
                : 'radial-gradient(600px 240px at 20% -10%, rgba(37, 99, 235, 0.18), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant='overline'
            sx={{
              letterSpacing: '0.32em',
              color: theme.palette.text.secondary,
            }}>
            MARKDOWN SHOP COMMUNITY
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700, mt: 1, mb: 1.5 }}>
            Support open-source README craftsmanship
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 640,
              mx: 'auto',
              mb: 3,
            }}>
            Markdown Shop is maintained by the Wisdom Fox community. If this
            project saves you time, consider supporting the next release and
            sustainable open tooling for creators.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent='center'>
            <Button
              variant='outlined'
              color='primary'
              href='https://github.com/narainkarthikv'
              target='_blank'
              rel='noreferrer'
              sx={{ px: 3.5, borderRadius: 999 }}>
              Join the Community
            </Button>
            <Button
              variant='contained'
              color='primary'
              href='https://github.com/narainkarthikv/markdown-shop'
              target='_blank'
              rel='noreferrer'
              sx={{ px: 3.5, borderRadius: 999 }}>
              Star on GitHub
            </Button>
          </Stack>
          <Typography
            variant='caption'
            sx={{
              display: 'block',
              mt: 2,
              color: theme.palette.text.secondary,
            }}>
            Donations are optional. Markdown Shop will always be free and open
            source.
          </Typography>
        </Box>
      </Box>
    </Section>
  );
};

export default SupportSection;
