/**
 * Design Tokens - Wisdom Fox semantic system
 * Synced with design-system.md for light/dark parity and accessibility.
 */

// Semantic colors
const semantic = {
  success: {
    light: '#22C55E',
    main: '#22C55E',
    dark: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.12)',
  },
  warning: {
    light: '#F59E0B',
    main: '#F59E0B',
    dark: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.12)',
  },
  error: {
    light: '#EF4444',
    main: '#EF4444',
    dark: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.12)',
  },
  info: {
    light: '#3B82F6',
    main: '#3B82F6',
    dark: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.12)',
  },
};

/**
 * Light Mode Tokens
 * Designed for maximum readability and professional appearance
 */
export const lightTokens = {
  // Backgrounds
  background: '#FFFFFF', // background.primary
  backgroundSecondary: '#F5F5F5', // background.secondary
  surface: '#FFFFFF', // surface.primary
  surfaceElevated: '#F5F5F5', // surface.secondary
  surfaceOverlay: 'rgba(0, 0, 0, 0.5)',
  surfaceHover: '#F5F5F5',
  surfaceActive: '#F0F0F0',

  // Text
  textPrimary: '#1A1A1A', // text.primary
  textSecondary: '#6B7280', // text.secondary
  textTertiary: '#9CA3AF', // text.muted
  textInverse: '#FFFFFF', // text.inverse

  // Borders
  border: '#E5E7EB', // border.primary
  borderSubtle: '#F0F0F0', // border.subtle
  borderStrong: '#D1D5DB',
  borderFocus: '#3B82F6',

  // Interactive elements
  primary: '#3B82F6', // interactive.default
  primaryHover: '#2563EB', // interactive.hover
  primaryActive: '#1D4ED8', // interactive.active
  primarySubtle: 'rgba(59, 130, 246, 0.1)',
  primaryMuted: 'rgba(59, 130, 246, 0.2)',
  interactiveDisabled: '#D1D5DB',

  // Accent (for highlights, badges)
  accent: '#3B82F6',
  accentMuted: 'rgba(59, 130, 246, 0.15)',
  accentStrong: '#2563EB',

  // Semantic
  success: semantic.success.main,
  successBg: semantic.success.bg,
  warning: semantic.warning.main,
  warningBg: semantic.warning.bg,
  error: semantic.error.main,
  errorBg: semantic.error.bg,
  info: semantic.info.main,
  infoBg: semantic.info.bg,

  // Shadows (for elevation)
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

/**
 * Dark Mode Tokens
 * Designed for reduced eye strain with proper contrast
 */
export const darkTokens = {
  // Backgrounds
  background: '#0B1118', // background.primary
  backgroundSecondary: '#121B26', // background.secondary
  surface: '#121B26', // surface.primary
  surfaceElevated: '#0F1822', // surface.secondary
  surfaceOverlay: 'rgba(2, 10, 18, 0.65)',
  surfaceHover: '#1E2C3C',
  surfaceActive: '#1F2C3B',

  // Text
  textPrimary: '#EAF2F6', // text.primary
  textSecondary: '#9FB0C3', // text.secondary
  textTertiary: '#7C8CA0', // text.muted
  textInverse: '#0B1118', // text.inverse

  // Borders
  border: '#1E2C3C', // border.primary
  borderSubtle: '#0F1822', // border.subtle
  borderStrong: '#1F2C3B',
  borderFocus: '#3B82F6',

  // Interactive elements
  primary: '#3B82F6', // interactive.default
  primaryHover: '#2563EB', // interactive.hover
  primaryActive: '#1E4FBF', // interactive.active
  primarySubtle: 'rgba(59, 130, 246, 0.1)',
  primaryMuted: 'rgba(59, 130, 246, 0.2)',
  interactiveDisabled: '#1F2C3B',

  // Accent
  accent: '#3B82F6',
  accentMuted: 'rgba(59, 130, 246, 0.15)',
  accentStrong: '#2563EB',

  // Semantic
  success: semantic.success.light,
  successBg: 'rgba(16, 185, 129, 0.1)',
  warning: semantic.warning.light,
  warningBg: 'rgba(245, 158, 11, 0.1)',
  error: semantic.error.light,
  errorBg: 'rgba(239, 68, 68, 0.1)',
  info: semantic.info.light,
  infoBg: 'rgba(59, 130, 246, 0.1)',

  // Shadows (more subtle in dark mode)
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
  },
};

/**
 * Typography Scale - Modern, readable hierarchy
 */
export const typography = {
  // Font families
  fontFamily: {
    sans: "'Sora', ui-sans-serif, system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
    display: "'Sora', ui-sans-serif, system-ui, sans-serif",
  },

  // Font sizes (rem-based for accessibility)
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '2.5rem', // 40px
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
};

/**
 * Spacing Scale (8px base)
 */
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
};

/**
 * Border Radius (modern, subtle curves)
 */
export const borderRadius = {
  none: '0',
  sm: '0.375rem', // 6px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
};

/**
 * Animation/Transition tokens
 */
export const animation = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Z-index layers
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  tooltip: 1400,
  toast: 1500,
};
