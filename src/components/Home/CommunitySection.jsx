import { Box, Typography, Stack, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { sectionVariants } from './animations';

const CommunitySection = () => {
  const theme = useTheme();

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      style={{ width: '100%' }}
      aria-label='Community Section'>
      <Box sx={{ py: { xs: 6, md: 9 }, px: 2, maxWidth: 1100, mx: 'auto' }}>
        <Box
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            textAlign: 'center',
          }}>
          <Typography
            variant='overline'
            sx={{
              letterSpacing: '0.2em',
              color: theme.palette.text.secondary,
            }}>
            WISDOM FOX COMMUNITY
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: theme.palette.text.primary,
            }}>
            Support open-source craft
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 680,
              mx: 'auto',
              mb: 3,
            }}>
            Markdown Shop is built by the Wisdom Fox community. If this project
            helps your work, consider supporting ongoing development and open
            tooling for creators.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent='center'>
            <Button
              variant='contained'
              color='primary'
              href='https://github.com/narainkarthikv'
              target='_blank'
              rel='noreferrer'>
              Join the Community
            </Button>
            <Button
              variant='outlined'
              color='primary'
              href='https://github.com/narainkarthikv/markdown-shop'
              target='_blank'
              rel='noreferrer'>
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
            Every star and contribution keeps the project sustainable.
          </Typography>
        </Box>
      </Box>
    </motion.section>
  );
};

export default CommunitySection;
