import { lazy, memo, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  pageTransitionVariants,
  pageTransition,
} from '@/animations/pageTransitions';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { ROUTES } from '@config/index';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load page components with preload hints
const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home'));
const Components = lazy(
  () => import(/* webpackChunkName: "components" */ './pages/Components')
);
const Output = lazy(
  () => import(/* webpackChunkName: "output" */ './pages/Output')
);
const TemplatesPage = lazy(
  () => import(/* webpackChunkName: "templates" */ './pages/TemplatesPage')
);
const PromptsPage = lazy(
  () => import(/* webpackChunkName: "prompts" */ './pages/PromptsPage')
);

/**
 * SEO Component with helmet for metadata
 */
const SEO = memo(
  ({
    title,
    description,
    keywords,
    isHome = false,
    themeColor = '#3B82F6',
  }) => (
    <Helmet>
      <title>{title || 'Markdown Shop'}</title>
      <meta
        name='description'
        content={
          description ||
          'Create stunning, professional README files for your projects with our easy-to-use tools and templates.'
        }
      />
      <meta
        name='keywords'
        content={
          keywords ||
          'markdown shop, README generator, markdown, templates, open source, documentation'
        }
      />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='theme-color' content={themeColor} />
      {isHome && (
        <link rel='canonical' href='https://markdownshop.netlify.app/' />
      )}
    </Helmet>
  )
);

SEO.displayName = 'SEO';

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  isHome: PropTypes.bool,
  themeColor: PropTypes.string,
};

/**
 * App layout wrapper component
 */
const AppLayout = memo(({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: 'none',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}>
      <SEO isHome={isHome} themeColor={theme.palette.primary.main} />

      {/* Only show Navbar on non-home routes */}
      {!isHome && <Navbar />}

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: theme.palette.background.default,
        }}>
        {children}
      </Box>

      {isHome && <Footer />}
    </Box>
  );
});

AppLayout.displayName = 'AppLayout';

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const PageTransition = memo(({ pageKey, children }) => (
  <motion.div
    key={pageKey}
    initial='initial'
    animate='in'
    exit='out'
    variants={pageTransitionVariants}
    transition={pageTransition}>
    {children}
  </motion.div>
));

PageTransition.displayName = 'PageTransition';

PageTransition.propTypes = {
  pageKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Main App component with routing and page transitions
 */
const App = () => {
  return (
    <Router>
      <AnimatePresence mode='wait'>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
              }}>
              <div>Loading...</div>
            </Box>
          }>
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                <PageTransition pageKey='home'>
                  <AppLayout>
                    <Home />
                  </AppLayout>
                </PageTransition>
              }
            />
            <Route
              path={ROUTES.COMPONENTS}
              element={
                <PageTransition pageKey='components'>
                  <AppLayout>
                    <Components />
                  </AppLayout>
                </PageTransition>
              }
            />
            <Route
              path={ROUTES.SHOP}
              element={
                <PageTransition pageKey='output'>
                  <AppLayout>
                    <Output />
                  </AppLayout>
                </PageTransition>
              }
            />
            <Route
              path={ROUTES.TEMPLATES}
              element={
                <PageTransition pageKey='templates'>
                  <AppLayout>
                    <TemplatesPage />
                  </AppLayout>
                </PageTransition>
              }
            />
            <Route
              path={ROUTES.PROMPTS}
              element={
                <PageTransition pageKey='prompts'>
                  <AppLayout>
                    <PromptsPage />
                  </AppLayout>
                </PageTransition>
              }
            />
            <Route
              path={ROUTES.NOT_FOUND}
              element={
                <PageTransition pageKey='404'>
                  <AppLayout>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        textAlign: 'center',
                        p: 3,
                      }}>
                      <h1>404 - Page Not Found</h1>
                      <p>The page you are looking for does not exist.</p>
                    </Box>
                  </AppLayout>
                </PageTransition>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Router>
  );
};

App.displayName = 'App';

export default App;
