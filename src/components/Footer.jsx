import React from 'react';
import { Box, Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Project',
    links: [
      { label: 'Open app', to: '/shop', internal: true },
      { label: 'Templates', to: '/templates', internal: true },
      { label: 'Components', to: '/components', internal: true },
      {
        label: 'GitHub repo',
        href: 'https://github.com/narainkarthikv/readme-shop',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        label: 'Contributing',
        href: 'https://github.com/narainkarthikv/readme-shop/blob/develop/CONTRIBUTING.md',
      },
      {
        label: 'Code of conduct',
        href: 'https://github.com/narainkarthikv/readme-shop/blob/develop/CODE_OF_CONDUCT.md',
      },
      {
        label: 'Issues & roadmap',
        href: 'https://github.com/narainkarthikv/readme-shop/issues',
      },
      {
        label: 'Wisdom Fox',
        href: 'https://github.com/narainkarthikv',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        label: 'MIT License',
        href: 'https://github.com/narainkarthikv/readme-shop/blob/develop/LICENSE',
      },
      {
        label: 'Security policy',
        href: 'https://github.com/narainkarthikv/readme-shop/security/policy',
      },
      {
        label: 'Release notes',
        href: 'https://github.com/narainkarthikv/readme-shop/releases',
      },
      {
        label: 'Documentation',
        href: 'https://github.com/narainkarthikv/readme-shop#readme',
      },
    ],
  },
];

const Footer = React.memo(() => (
  <Box
    component='footer'
    sx={(theme) => ({
      borderTop: `1px solid ${theme.palette.divider}`,
      bgcolor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      mt: { xs: 6, md: 8 },
    })}>
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, md: 3 },
        py: { xs: 5, md: 7 },
      }}>
      <Grid container spacing={{ xs: 4, md: 5 }}>
        <Grid item xs={12} md={4}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, color: 'text.primary' }}>
            README Shop
          </Typography>
          <Typography variant='body2' sx={{ mt: 2, color: 'text.secondary' }}>
            A fast README builder for open-source maintainers and makers. Curate
            templates, badges, icons, and stats in one clean workflow.
          </Typography>
          <Typography variant='caption' sx={{ display: 'block', mt: 2.5 }}>
            Built by the Wisdom Fox community.
          </Typography>
        </Grid>
        {footerLinks.map((group) => (
          <Grid item xs={6} sm={4} md={2} key={group.title}>
            <Typography
              variant='overline'
              sx={{ letterSpacing: '0.2em', color: 'text.secondary' }}>
              {group.title}
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1.5 }}>
              {group.links.map((link) =>
                link.internal ? (
                  <MuiLink
                    key={link.label}
                    component={Link}
                    to={link.to}
                    underline='hover'
                    color='inherit'>
                    {link.label}
                  </MuiLink>
                ) : (
                  <MuiLink
                    key={link.label}
                    href={link.href}
                    underline='hover'
                    color='inherit'
                    target='_blank'
                    rel='noreferrer'>
                    {link.label}
                  </MuiLink>
                )
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          mt: { xs: 4, md: 5 },
        }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          justifyContent='space-between'
          alignItems={{ sm: 'center' }}
          sx={{ pt: { xs: 3, md: 3.5 } }}>
          <Typography variant='caption'>
            © 2026 README Shop. Crafted with care for open source.
          </Typography>
          <Typography variant='caption'>
            Have feedback? Open an issue or drop a PR.
          </Typography>
        </Stack>
      </Box>
    </Box>
  </Box>
));

Footer.displayName = 'Footer';

export default Footer;
