import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import useMarkdownStore from '@/features/markdown/store/markdownStore';

const SVG_BANNER_MARKDOWN = `<a href="https://github.com/narainkarthikv/svg-banners" target="_blank"><img src="https://svg-banners.vercel.app/api?type=luminance&text1=Markdown%20Shop&width=1000&height=200" alt="SVG Banner" style="width:100%;max-width:600px;border-radius:8px;" /></a>`;

const SvgBanners = React.memo(() => {
  const theme = useTheme();
  const embedMarkdown = useMarkdownStore((state) => state.embedMarkdown);

  const handleClick = React.useCallback(
    () => embedMarkdown(SVG_BANNER_MARKDOWN),
    [embedMarkdown]
  );

  return (
    <Box
      sx={{
        width: '100%',
        mb: 3,
        textAlign: 'center',
      }}>
      <Typography
        variant='h6'
        sx={{
          mb: 1.5,
          fontWeight: 600,
          fontSize: '1.125rem',
          color: 'text.primary',
        }}>
        SVG Banner
      </Typography>
      <Box
        onClick={handleClick}
        sx={{
          display: 'inline-block',
          cursor: 'pointer',
          position: 'relative',
          borderRadius: 1,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4],
            '&::after': {
              opacity: 1,
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            opacity: 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          },
        }}
        role='button'
        tabIndex={0}
        aria-label='Insert SVG banner'
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}>
        <a
          href='https://github.com/narainkarthikv/svg-banners'
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => e.preventDefault()}>
          <img
            src='https://svg-banners.vercel.app/api?type=luminance&text1=Markdown%20Shop&width=1000&height=200'
            alt='SVG Banner - MARKDOWN SHOP'
            style={{
              width: '100%',
              maxWidth: 500,
              height: 'auto',
              display: 'block',
              borderRadius: 4,
            }}
          />
        </a>
      </Box>
    </Box>
  );
});

SvgBanners.displayName = 'SvgBanners';

export default SvgBanners;
