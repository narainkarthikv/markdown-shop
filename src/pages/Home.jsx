import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import {
  HeroSection,
  InfoSection,
  FeaturesSection,
  HowItWorksSection,
  TrustSection,
  CtaSection,
  SupportSection,
  ThanksSection,
} from '../components/Home';

const Home = React.memo(() => {
  const theme = useTheme();

  return (
    <Box
      component='main'
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        width: '100%',
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 0,
        transition: 'background 0.3s, color 0.3s',
      }}
      aria-label='Landing Page Main Content'>
      <Helmet>
        <title>Markdown Shop</title>
        <meta
          name='description'
          content='Markdown Shop is a SaaS-style README builder with Markdown Templates, AI Prompt Gallery, badges, icons, and live preview for modern project docs.'
        />
        <meta
          name='keywords'
          content='markdown shop, README builder, markdown templates, prompt gallery, SaaS, documentation, badges, icons'
        />
        <meta
          property='og:title'
          content='Markdown Shop - SaaS-grade README Builder'
        />
        <meta
          property='og:description'
          content='Build polished README docs faster with Markdown Templates, reusable prompts, live preview, and export-ready markdown.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://markdownshop.netlify.app' />
        <meta property='og:image' content='/public/favicon.svg' />
      </Helmet>

      <HeroSection />
      <InfoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TrustSection />
      <CtaSection />
      <ThanksSection />
      <SupportSection />
    </Box>
  );
});

Home.displayName = 'Home';

export default Home;
