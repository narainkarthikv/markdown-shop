import { Box, Grid, Container } from '@mui/material';
import GithubStats from './components/GithubStats';
import GithubTrophies from './components/GithubTrophies';
import GithubBadges from './components/GithubBadges';
import GithubStreak from './components/GithubStreak';
import GithubActivityGraph from './components/GithubActivityGraph';
import GithubRepoPin from './components/GithubRepoPin';
import GithubFollowers from './components/GithubFollowers';
import GithubCommitGraph from './components/GithubCommitGraph';
import GithubContributors from './components/GithubContributors';
import GithubMetrics from './components/GithubMetrics';
import GithubSnakeContribution from './components/GithubSnakeContribution';
import GithubSettings from './components/GithubSettings';
import { GithubDataProvider } from './GithubDataProvider';
import ModernSection, { SectionGroup } from '@/components/ui/ModernSection';

const GithubComponents = () => (
  <Container maxWidth='xl' sx={{ py: 4 }}>
    <GithubSettings />
    <SectionGroup spacing={8}>
      <ModernSection
        title='Core Statistics'
        description='Profile totals and estimated language mix from GitHub API data.'
        variant='default'>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <GithubStats />
          </Grid>
          <Grid item xs={12} lg={6}>
            <GithubStreak />
          </Grid>
        </Grid>
      </ModernSection>
      <ModernSection
        title='Badges & Engagement'
        description='Native profile and repository metrics. Profile views are not available from GitHub’s API.'
        variant='default'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <GithubBadges />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <GithubFollowers />
          </Grid>
        </Grid>
      </ModernSection>
      <ModernSection
        title='Achievements'
        description='Profile and repository milestones derived from GitHub API data.'
        variant='default'>
        <GithubTrophies />
      </ModernSection>
      <ModernSection
        title='Activity & Contributions'
        description='Recent public events only; GitHub’s complete contribution calendar is not available through these public REST endpoints.'
        variant='default'
        collapsible
        defaultExpanded>
        <Box sx={{ mb: 3 }}>
          <GithubActivityGraph />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <GithubCommitGraph />
          </Grid>
          <Grid item xs={12} md={6}>
            <GithubSnakeContribution />
          </Grid>
        </Grid>
      </ModernSection>
      <ModernSection
        title='Repository & Community'
        description='Repository summaries and contributors from GitHub’s REST API.'
        variant='default'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <GithubRepoPin />
          </Grid>
          <Grid item xs={12} md={6}>
            <GithubContributors />
          </Grid>
          <Grid item xs={12}>
            <GithubMetrics />
          </Grid>
        </Grid>
      </ModernSection>
    </SectionGroup>
  </Container>
);

const GithubSection = () => (
  <GithubDataProvider>
    <GithubComponents />
  </GithubDataProvider>
);
export default GithubSection;
