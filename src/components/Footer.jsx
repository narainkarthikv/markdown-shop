import React from 'react';
import { DataObjectRounded } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const repoUrl = 'https://github.com/narainkarthikv/markdown-shop';

const footerGroups = [
  {
    title: 'Project',
    links: [
      { label: 'Open builder', to: '/shop', kind: 'internal' },
      { label: 'GitHub repository', href: repoUrl, kind: 'external' },
      {
        label: 'Issues & roadmap',
        href: `${repoUrl}/issues`,
        kind: 'external',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        label: 'Contributing',
        href: `${repoUrl}/blob/main/CONTRIBUTING.md`,
        kind: 'external',
      },
      {
        label: 'Code of conduct',
        href: `${repoUrl}/blob/main/CODE_OF_CONDUCT.md`,
        kind: 'external',
      },
      {
        label: 'Security policy',
        href: `${repoUrl}/blob/main/SECURITY.md`,
        kind: 'external',
      },
    ],
  },
  {
    title: 'Legal & docs',
    links: [
      {
        label: 'MIT License',
        href: `${repoUrl}/blob/main/LICENSE`,
        kind: 'external',
      },
      {
        label: 'Documentation',
        href: `${repoUrl}/blob/main/README.md`,
        kind: 'external',
      },
      { label: 'Release notes', href: `${repoUrl}/releases`, kind: 'external' },
    ],
  },
];

function FooterLink({ item }) {
  const sharedSx = {
    width: 'fit-content',
    color: 'inherit',
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'color var(--ms-duration-fast) var(--ms-easing-standard)',
    '&:hover': { color: '#fff' },
    '&:focus-visible': { outline: '2px solid #93c5fd', outlineOffset: 3 },
  };

  if (item.kind === 'internal') {
    return (
      <Box component={Link} to={item.to} sx={sharedSx}>
        {item.label}
      </Box>
    );
  }

  return (
    <Box
      component='a'
      href={item.href}
      target='_blank'
      rel='noopener noreferrer'
      sx={sharedSx}>
      {item.label}
    </Box>
  );
}

function FooterSection({ title, items }) {
  return (
    <Box>
      <Typography
        component='h2'
        variant='overline'
        sx={{ color: '#cbd5e1', fontWeight: 700, letterSpacing: '.12em' }}>
        {title}
      </Typography>
      <Stack
        component='ul'
        spacing={1}
        sx={{ mt: 1.25, p: 0, m: 0, listStyle: 'none' }}>
        {items.map((item) => (
          <Box component='li' key={item.label} sx={{ display: 'flex' }}>
            <FooterLink item={item} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

const Footer = React.memo(() => (
  <Box
    component='footer'
    sx={{
      bgcolor: (theme) =>
        theme.palette.mode === 'dark' ? '#020617' : '#0f172a',
      color: '#94a3b8',
      py: { xs: 4, md: 5 },
      px: { xs: 2, md: 3 },
    }}>
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(3, minmax(0, 1fr))',
            lg: 'minmax(280px, .9fr) minmax(0, 1.5fr)',
          },
          gap: { xs: 3, md: 5 },
          alignItems: 'start',
        }}>
        <Box sx={{ gridColumn: { xs: '1 / -1', lg: 'auto' }, maxWidth: 360 }}>
          <Stack direction='row' alignItems='center' spacing={1.25}>
            <Box
              sx={{
                width: 36,
                height: 36,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 'var(--ms-radius-lg)',
                bgcolor: '#1d4ed8',
                color: '#fff',
              }}>
              <DataObjectRounded fontSize='small' />
            </Box>
            <Typography variant='h6' sx={{ color: '#fff', fontWeight: 750 }}>
              Markdown Shop
            </Typography>
          </Stack>
          <Typography
            variant='body2'
            sx={{ mt: 1.5, color: '#94a3b8', lineHeight: 1.65 }}>
            A practical workspace for clearer GitHub READMEs and profile pages.
          </Typography>
          <Stack spacing={0.6} sx={{ mt: 1.5 }}>
            {[
              'No account required',
              'Markdown you can take anywhere',
              'Free and open source',
            ].map((point) => (
              <Typography
                key={point}
                variant='caption'
                sx={{ color: '#cbd5e1' }}>
                <Box component='span' sx={{ mr: 1, color: '#60a5fa' }}>
                  ✓
                </Box>
                {point}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Box
          component='nav'
          aria-label='Footer'
          sx={{
            gridColumn: { xs: '1 / -1', sm: '1 / -1', lg: 'auto' },
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: { xs: 1.5, sm: 3 },
          }}>
          {footerGroups.map((group) => (
            <FooterSection
              key={group.title}
              title={group.title}
              items={group.links}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ borderTop: '1px solid #334155', mt: { xs: 3, md: 4 }, pt: 2 }}>
        <Typography
          variant='caption'
          sx={{ display: 'block', textAlign: 'center', color: '#94a3b8' }}>
          © 2026 Markdown Shop · Made with care for the open-source community
        </Typography>
      </Box>
    </Box>
  </Box>
));

Footer.displayName = 'Footer';

export default Footer;
