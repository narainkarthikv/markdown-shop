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
  STORE: 'markdown-shop-store',
  MARKDOWN_DRAFT: 'markdown-shop-markdown-draft',
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  SKILLICONS: 'https://skillicons.dev/icons',
};

/**
 * Theme Options
 */
export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  DEFAULT: 'dark',
};

/** Themes used by generated Markdown examples, separate from the app theme. */
export const MARKDOWN_THEME_OPTIONS = {
  DEFAULT: 'default',
  TOKYONIGHT: 'tokyonight',
  LUMINANCE: 'luminance',
};

/**
 * Application Routes
 */
export const ROUTES = {
  HOME: '/',
  COMPONENTS: '/components',
  SHOP: '/shop',
  TEMPLATES: '/templates',
  PROMPTS: '/prompts',
  NOT_FOUND: '*',
};
