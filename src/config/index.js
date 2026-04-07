/**
 * Environment Configuration
 * Centralized environment variables and configuration
 */

export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  baseUrl: import.meta.env.BASE_URL,
};

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  THEME_MODE: 'readme-shop-theme-mode',
  USER_PREFERENCES: 'readme-shop-preferences',
  STORE: 'readme-shop-store',
};

/**
 * External URLs
 */
export const GITHUB_URLS = {
  REPOSITORY: 'https://github.com/narainkarthikv/readme-shop',
  COMMUNITY: 'https://github.com/narainkarthikv',
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  GITHUB_STATS: 'https://github-readme-stats.vercel.app',
  SKILLICONS: 'https://skillicons.dev/icons',
  SVG_BANNERS: 'https://svg-banners.vercel.app',
};

/**
 * Theme Options
 */
export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  DEFAULT: 'dark',
};

/**
 * Default Dimensions
 */
export const DEFAULT_DIMENSIONS = {
  BANNER_WIDTH: 1000,
  BANNER_HEIGHT: 200,
  ICON_MAX_WIDTH: 60,
  STATS_MAX_WIDTH: 400,
  LANGUAGES_MAX_WIDTH: 300,
};

/**
 * Application Routes
 */
export const ROUTES = {
  HOME: '/',
  COMPONENTS: '/components',
  SHOP: '/shop',
  TEMPLATES: '/templates',
  OUTPUT: '/output',
  NOT_FOUND: '*',
};

/**
 * Breakpoints (align with MUI)
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

/**
 * Animation Variants
 */
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
};

/**
 * Performance Configuration
 */
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 200,
  LAZY_LOAD_DELAY: 100,
};
