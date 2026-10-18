import { createTheme } from '@mui/material/styles';
import { THEME_OPTIONS } from '@config/index';
import {
  lightTokens,
  darkTokens,
  typography as designTypography,
  spacing as spacingTokens,
  borderRadius,
  animation,
  zIndex,
  createDesignTokens,
} from './tokens';

/**
 * Base typography configuration
 * Sora is the brand font across the product
 */
const baseTypography = {
  fontFamily: designTypography.fontFamily.sans,
  h1: {
    fontWeight: designTypography.fontWeight.bold,
    fontSize: designTypography.fontSize.h1,
    lineHeight: 1.12,
    letterSpacing: designTypography.letterSpacing.tight,
  },
  h2: {
    fontWeight: designTypography.fontWeight.semibold,
    fontSize: designTypography.fontSize.h2,
    lineHeight: 1.18,
    letterSpacing: designTypography.letterSpacing.tight,
  },
  h3: {
    fontWeight: designTypography.fontWeight.semibold,
    fontSize: designTypography.fontSize.h3,
    lineHeight: 1.25,
  },
  h4: {
    fontWeight: designTypography.fontWeight.semibold,
    fontSize: designTypography.fontSize.h4,
    lineHeight: 1.3,
  },
  h5: {
    fontWeight: designTypography.fontWeight.medium,
    fontSize: designTypography.fontSize.h5,
    lineHeight: 1.35,
  },
  h6: {
    fontWeight: designTypography.fontWeight.medium,
    fontSize: designTypography.fontSize.h6,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: designTypography.fontSize.base,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: designTypography.fontSize.bodySmall,
    lineHeight: 1.5,
  },
  button: {
    textTransform: 'none',
    fontWeight: designTypography.fontWeight.semibold,
  },
};

const buildShadows = (tokens) => [
  'none',
  tokens.shadow.sm,
  tokens.shadow.md,
  tokens.shadow.lg,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
  tokens.shadow.xl,
];

// Keep MUI's familiar 8px spacing factor while resolving common steps through
// the shared 4px CSS token scale. Unsupported fractional steps preserve their
// existing computed pixel values for compatibility.
const tokenizedMuiSpacing = (factor = 1) => {
  if (typeof factor !== 'number' || !Number.isFinite(factor)) return factor;
  if (factor === 0) return 'var(--ms-space-0)';

  const step = factor * 2;
  if (
    Number.isInteger(step) &&
    Object.prototype.hasOwnProperty.call(spacingTokens, step)
  ) {
    return `var(--ms-space-${step})`;
  }

  return `${factor * 8}px`;
};

const buildCssVariables = (tokens) => ({
  '--ms-color-background': tokens.background,
  '--ms-color-background-subtle': tokens.backgroundSecondary,
  '--ms-color-surface': tokens.surface,
  '--ms-color-surface-inset': tokens.surfaceElevated,
  '--ms-color-surface-hover': tokens.surfaceHover,
  '--ms-color-text-primary': tokens.textPrimary,
  '--ms-color-text-secondary': tokens.textSecondary,
  '--ms-color-text-muted': tokens.textTertiary,
  '--ms-color-text-inverse': tokens.textInverse,
  '--ms-color-border': tokens.border,
  '--ms-color-border-subtle': tokens.borderSubtle,
  '--ms-color-border-strong': tokens.borderStrong,
  '--ms-color-focus': tokens.borderFocus,
  '--ms-color-primary': tokens.primary,
  '--ms-color-primary-hover': tokens.primaryHover,
  '--ms-color-primary-active': tokens.primaryActive,
  '--ms-color-primary-subtle': tokens.primarySubtle,
  '--ms-color-success': tokens.success,
  '--ms-color-success-surface': tokens.successBg,
  '--ms-color-warning': tokens.warning,
  '--ms-color-warning-surface': tokens.warningBg,
  '--ms-color-error': tokens.error,
  '--ms-color-error-surface': tokens.errorBg,
  '--ms-color-info': tokens.info,
  '--ms-color-info-surface': tokens.infoBg,
  '--ms-focus-ring-width': '2px',
  '--ms-focus-ring-offset': '2px',
  '--ms-font-sans': designTypography.fontFamily.sans,
  '--ms-font-mono': designTypography.fontFamily.mono,
  '--ms-radius-none': borderRadius.none,
  '--ms-radius-xs': borderRadius.xs,
  '--ms-radius-sm': borderRadius.sm,
  '--ms-radius-md': borderRadius.md,
  '--ms-radius-lg': borderRadius.lg,
  '--ms-radius-xl': borderRadius.xl,
  '--ms-radius-feature': borderRadius.feature,
  '--ms-radius-2xl': borderRadius['2xl'],
  '--ms-radius-3xl': borderRadius['3xl'],
  '--ms-radius-full': borderRadius.full,
  '--ms-duration-fast': animation.duration.fast,
  '--ms-duration-base': animation.duration.base,
  '--ms-duration-slow': animation.duration.slow,
  '--ms-easing-standard': animation.easing.default,
  '--ms-elevation-sm': tokens.shadow.sm,
  '--ms-elevation-md': tokens.shadow.md,
  '--ms-elevation-lg': tokens.shadow.lg,
  '--ms-control-target-min': '44px',
  '--ms-control-icon-size': '36px',
  '--ms-control-field-height': '40px',
  '--ms-layout-content-max-width': '1440px',
  '--ms-layout-reading-max-width': '72ch',
  '--ms-layout-sidebar-width': '290px',
  '--ms-z-dropdown': zIndex.dropdown,
  '--ms-z-sticky': zIndex.sticky,
  '--ms-z-modal': zIndex.modal,
  '--ms-z-popover': zIndex.popover,
  '--ms-z-tooltip': zIndex.tooltip,
  '--ms-z-toast': zIndex.toast,
  ...Object.fromEntries(
    Object.entries(spacingTokens).map(([step, value]) => [
      `--ms-space-${step}`,
      value,
    ])
  ),
});

/**
 * Common component overrides with enhanced modern styling
 */
const getComponentOverrides = (mode, tokens) => ({
  MuiCssBaseline: {
    styleOverrides: {
      ':root': buildCssVariables(tokens),
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: `${tokens.border} ${tokens.background}`,
        '&::-webkit-scrollbar': {
          width: spacingTokens[2],
          height: spacingTokens[2],
        },
        '&::-webkit-scrollbar-track': {
          background: tokens.background,
        },
        '&::-webkit-scrollbar-thumb': {
          background: tokens.border,
          borderRadius: borderRadius.sm,
          '&:hover': {
            background: tokens.borderStrong,
          },
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
        padding: `${spacingTokens[2]} ${spacingTokens[5]}`,
        fontSize: '0.9rem',
        fontWeight: designTypography.fontWeight.semibold,
        textTransform: 'none',
        transition: `transform ${animation.duration.base} ${animation.easing.out}, box-shadow ${animation.duration.base} ${animation.easing.out}`,
        '&:hover': {
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: tokens.shadow.md,
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        boxShadow: 'none',
        border: `1px solid ${tokens.borderSubtle}`,
        transition: `transform ${animation.duration.base} ${animation.easing.out}, box-shadow ${animation.duration.base} ${animation.easing.out}, border-color ${animation.duration.base} ${animation.easing.out}`,
        '&:hover': {
          boxShadow: tokens.shadow.lg,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: borderRadius.md,
          transition: `border-color ${animation.duration.base} ${animation.easing.out}, box-shadow ${animation.duration.base} ${animation.easing.out}`,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.border,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.borderStrong,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.borderFocus,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        transition: `box-shadow ${animation.duration.base} ${animation.easing.out}`,
      },
      elevation0: {
        boxShadow: 'none',
      },
      elevation1: {
        boxShadow: tokens.shadow.sm,
      },
      elevation2: {
        boxShadow: tokens.shadow.md,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
        transition: `transform ${animation.duration.fast} ${animation.easing.out}, background-color ${animation.duration.fast} ${animation.easing.out}`,
      },
    },
  },
  MuiButtonGroup: {
    styleOverrides: {
      grouped: {
        borderRadius: borderRadius.sm,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        border: `1px solid ${tokens.border}`,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: borderRadius.sm,
        backgroundColor:
          mode === 'dark' ? tokens.surfaceElevated : tokens.textPrimary,
        color: mode === 'dark' ? tokens.textPrimary : tokens.textInverse,
      },
      arrow: {
        color: mode === 'dark' ? tokens.surfaceElevated : tokens.textPrimary,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius.lg,
        border: `1px solid ${tokens.borderSubtle}`,
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius.md,
        border: `1px solid ${tokens.borderSubtle}`,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
        margin: '2px 6px',
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: tokens.primary,
        height: 2,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
        textTransform: 'none',
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
      },
    },
  },
  MuiAvatar: {
    defaultProps: {
      variant: 'rounded',
    },
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        backdropFilter: 'blur(12px)',
        backgroundColor: tokens.surfaceOverlay,
        borderBottom: `1px solid ${tokens.borderSubtle}`,
        boxShadow: 'none',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
});

const buildPalette = (tokens, mode) => ({
  mode,
  primary: {
    main: tokens.primary,
    light: tokens.primaryMuted,
    dark: tokens.primaryActive,
    contrastText: tokens.textInverse,
  },
  secondary: {
    main: tokens.accent,
    light: tokens.accentMuted,
    dark: tokens.accentStrong,
    contrastText: tokens.textInverse,
  },
  background: {
    default: tokens.background,
    paper: tokens.surface,
  },
  text: {
    primary: tokens.textPrimary,
    secondary: tokens.textSecondary,
  },
  divider: tokens.borderSubtle,
  action: {
    hover: tokens.primarySubtle,
    selected: tokens.primaryMuted,
    focus: tokens.primaryMuted,
    disabled: tokens.textTertiary,
    disabledBackground: tokens.interactiveDisabled,
  },
  success: {
    main: tokens.success,
  },
  warning: {
    main: tokens.warning,
  },
  error: {
    main: tokens.error,
  },
  info: {
    main: tokens.info,
  },
});

/**
 * Light theme configuration - High contrast for readability
 */
const lightTheme = {
  typography: baseTypography,
  palette: buildPalette(lightTokens, 'light'),
  shape: {
    borderRadius: Number.parseFloat(borderRadius.md),
  },
  shadows: buildShadows(lightTokens),
};

/**
 * Dark theme configuration - Consistent single-accent design
 */
const darkTheme = {
  typography: baseTypography,
  palette: buildPalette(darkTokens, 'dark'),
  shape: {
    borderRadius: Number.parseFloat(borderRadius.md),
  },
  shadows: buildShadows(darkTokens),
};

/**
 * Get theme based on mode
 * @param {string} mode - 'light' or 'dark'
 * @returns {Theme} MUI theme object
 */
export const getTheme = (mode = THEME_OPTIONS.DEFAULT) => {
  const isDark = mode === THEME_OPTIONS.DARK;
  const themeConfig = isDark ? darkTheme : lightTheme;
  const tokens = isDark ? darkTokens : lightTokens;

  return createTheme({
    ...themeConfig,
    spacing: tokenizedMuiSpacing,
    transitions: {
      duration: {
        shortest: parseInt(animation.duration.fast, 10),
        shorter: parseInt(animation.duration.base, 10),
        short: parseInt(animation.duration.base, 10) + 50,
        standard: parseInt(animation.duration.slow, 10),
        complex: parseInt(animation.duration.slower, 10),
        enteringScreen: parseInt(animation.duration.slow, 10),
        leavingScreen: parseInt(animation.duration.base, 10),
      },
      easing: {
        easeInOut: animation.easing.inOut,
        easeOut: animation.easing.out,
        easeIn: animation.easing.in,
        sharp: animation.easing.default,
      },
    },
    components: getComponentOverrides(mode, tokens),
    designTokens: createDesignTokens(tokens),
    customTokens: tokens,
  });
};
