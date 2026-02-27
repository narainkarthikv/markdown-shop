import { Box, Grid, Container } from '@mui/material';
import GithubStats from './components/GithubStats';
import GithubTrophies from './components/GithubTrophies';
import GithubBadges from './components/GithubBadges';
import GithubContributors from './components/GithubContributors';
import GithubStreak from './components/GithubStreak';
import { GithubActivityGraph } from './components/GithubActivityGraph';
import ProfileViewsCounter from './components/ProfileViewsCounter';
import GithubMetrics from './components/GithubMetrics';
import GithubSnakeContribution from './components/GithubSnakeContribution';
import GithubRepoPin from './components/GithubRepoPin';
import GithubFollowers from './components/GithubFollowers';
import GithubCommitGraph from './components/GithubCommitGraph';
import ModernSection, { SectionGroup } from '@/components/ui/ModernSection';

/**
 * Modern GitHub Section Layout
 *
 * Information Architecture:
 * 1. Core Stats - Most important metrics (Stats, Streak)
 * 2. Engagement Badges - Quick insights (Views, Badges, Followers)
 * 3. Visual Highlights - Eye-catching elements (Trophies)
 * 4. Activity Analysis - Contribution patterns (Activity Graph, Commit Graph)
 * 5. Project Context - Repository info (Repo Pin, Metrics)
 * 6. Collaboration - Team aspect (Contributors)
 * 7. Creative Visuals - Fun elements (Snake Animation)
 */
const GithubSection = () => (
  <Container maxWidth='xl' sx={{ py: 4 }}>
    <SectionGroup spacing={8}>
      {/* SECTION 1: Core Statistics */}
      <ModernSection
        title='Core Statistics'
        description='Your most important GitHub metrics at a glance'
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

      {/* SECTION 2: Engagement Badges */}
      <ModernSection
        title='Badges & Engagement'
        description='Showcase your profile engagement and achievements'
        variant='default'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <ProfileViewsCounter />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <GithubBadges />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <GithubFollowers />
          </Grid>
        </Grid>
      </ModernSection>

      {/* SECTION 3: Achievements */}
      <ModernSection
        title='Achievements'
        description='Display your GitHub trophies and milestones'
        variant='default'>
        <GithubTrophies />
      </ModernSection>

      {/* SECTION 4: Activity & Contributions */}
      <ModernSection
        title='Activity & Contributions'
        description='Visualize your coding activity and contribution patterns'
        variant='default'
        collapsible
        defaultExpanded={true}>
        <Box sx={{ mb: 3 }}>
          <GithubActivityGraph />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <GithubCommitGraph />
          </Grid>
          <Grid item xs={12} md={6}>
            <GithubRepoPin />
          </Grid>
        </Grid>
      </ModernSection>
    </SectionGroup>
  </Container>
);

export default GithubSection;
