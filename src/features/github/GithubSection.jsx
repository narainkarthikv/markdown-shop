import { useState } from 'react';
import { Box } from '@mui/material';
import GithubStats from './components/GithubStats';
import GithubTrophies from './components/GithubTrophies';
import GithubBadges from './components/GithubBadges';
import GithubStreak from './components/GithubStreak';
import GithubActivityGraph from './components/GithubActivityGraph';
import GithubRepoPin from './components/GithubRepoPin';
import GithubFollowers from './components/GithubFollowers';
import GithubCommitGraph from './components/GithubCommitGraph';
import GithubContributors from './components/GithubContributors';
import GithubSnakeContribution from './components/GithubSnakeContribution';
import GithubSettings from './components/GithubSettings';
import SvgBanners from '@/components/SvgBanners';
import { GithubDataProvider } from './GithubDataProvider';
import ModernSection, { SectionGroup } from '@/components/ui/ModernSection';
import { GithubThemeContext } from './GithubThemeContext';
const GithubComponents = () => (
  <Box sx={{ py: { xs: 2, md: 3 }, minWidth: 0 }}>
    <GithubSettings />
    <SectionGroup spacing={4} sx={{ minWidth: 0 }}>
      <ModernSection
        title='Profile components'
        description='Profile stats, achievements, and a custom header banner for your README.'
        variant='compact'
        sx={sectionStyle}>
        <Box sx={responsiveGrid}>
          <GithubStats />
          <GithubStreak />
          <GithubBadges />
          <GithubFollowers />
          <GithubTrophies />
          <SvgBanners />
        </Box>
      </ModernSection>
      <ModernSection
        title='Activity & Contributions'
        description='Recent public events only; GitHub’s complete contribution calendar is not available through these public REST endpoints.'
        variant='compact'
        sx={sectionStyle}>
        <Box sx={responsiveGrid}>
          <GithubActivityGraph />
          <GithubCommitGraph />
          <GithubSnakeContribution />
        </Box>
      </ModernSection>
      <ModernSection
        title='Repository & Community'
        description='Repository summaries and contributors from GitHub’s REST API.'
        variant='compact'
        sx={sectionStyle}>
        <Box sx={responsiveGrid}>
          <GithubRepoPin />
          <GithubContributors />
        </Box>
      </ModernSection>
    </SectionGroup>
  </Box>
);

const responsiveGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
  gap: { xs: 1.5, sm: 2, xl: 2.5 },
  minWidth: 0,
  '& > *': { minWidth: 0 },
};

const sectionStyle = {
  pt: { xs: 2, md: 2.5 },
  borderTop: '1px solid',
  borderColor: 'divider',
};

const GithubSection = () => {
  const [flavor, setFlavor] = useState('cyberpunk');
  const [size, setSize] = useState('medium');
  return (
    <GithubThemeContext.Provider value={{ flavor, setFlavor, size, setSize }}>
      <GithubDataProvider>
        <GithubComponents />
      </GithubDataProvider>
    </GithubThemeContext.Provider>
  );
};
export default GithubSection;
