import { TextStyle } from 'react-native'

// interfaces
import { Theme, ThemeFontStyles, Themes, ThemeTypographyOptions, ThemeUtils } from '@/types/theme'

// libs
import { grey, blue } from '../libs/palette'

// export const theme_DEFAULT_FONT_FAMILY = 'Jost';
export const theme_DEFAULT_FONT_FAMILY = 'Plus Jakarta Sans'

export const theme_breakpoints = {
  xs: 0,
  sm: 400,
  md: 576,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const

export const theme_spacingSize = 4

export const theme_shape = {
  borderRadius: 8,
}

export const theme_brandPalette = {
  primary: {
    main: blue[500],
    dark: blue[700],
    light: '#DEEFFE',
    contrastText: '#fbfbfb',
  },
  secondary: {
    main: '#FF4423',
    dark: '#DB2719',
    light: '#FFE7D3',
    contrastText: '#fbfbfb',
  },
  common: {
    white: '#ffffff',
    black: '#000000',
  },
}

const theme_typographyFontWeight: Record<
  keyof Pick<ThemeFontStyles, 'fontWeightLight' | 'fontWeightRegular' | 'fontWeightMedium' | 'fontWeightBold'>,
  TextStyle['fontWeight']
> = {
  fontWeightLight: '300',
  fontWeightRegular: '500',
  fontWeightMedium: '600',
  fontWeightBold: '700',
}

/** Typography */
export const theme_typography: ThemeTypographyOptions = {
  h1: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h2: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h3: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h4: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h5: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h6: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 14.2,
    lineHeight: 22,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  body: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  subtitle: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  caption: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  button: {
    fontFamily: theme_DEFAULT_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
}

export const theme_utils: ThemeUtils = {
  createSpacing: (unit?: number) => theme_spacingSize * Number(unit || 1),
}

/**
 * Light theme
 */
export const theme_lightTheme: Theme = {
  spacing: theme_spacingSize,
  shape: theme_shape,
  typography: theme_typography,
  palette: {
    ...theme_brandPalette,
    text: {
      primary: grey[900],
      secondary: grey[600],
      disabled: grey[400],
    },
    success: {
      main: '#02bf71',
      light: '#e9fff6',
      dark: '#04985a',
      contrastText: '#fbfbfb',
    },
    info: {
      main: '#038fff',
      dark: '#066cc1',
      light: '#e8f7ff',
      contrastText: '#fbfbfb',
    },
    warning: {
      main: '#ff9100',
      dark: '#B75800',
      light: '#fdf4ed',
      contrastText: '#fbfbfb',
    },
    error: {
      main: '#f93324',
      light: '#fbedec',
      dark: '#de1a0a',
      contrastText: '#fff7f7',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.05)',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },

  // utils
  utils: theme_utils,
}

/**
 * Dark theme
 */
export const theme_darkTheme: Theme = {
  spacing: theme_spacingSize,
  shape: theme_shape,
  typography: theme_typography,
  palette: {
    ...theme_brandPalette,
    text: {
      primary: '#fbfbfb',
      secondary: 'rgba(255, 255, 255, 0.75)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    success: {
      main: '#02bf71',
      light: '#e9fff6',
      dark: '#04985a',
      contrastText: '#fbfbfb',
    },
    info: {
      main: '#038fff',
      dark: '#066cc1',
      light: '#e8f7ff',
      contrastText: '#fbfbfb',
    },
    warning: {
      main: '#ff9100',
      dark: '#ff9100',
      light: '#fdf4ed',
      contrastText: '#fbfbfb',
    },
    error: {
      main: '#f93324',
      light: '#fbedec',
      dark: '#de1a0a',
      contrastText: '#fff7f7',
    },
    background: {
      default: grey[900],
      paper: '#0e0e0e',
    },
    divider: 'rgba(255, 255, 255, 0.5)',
    action: {
      active: '#fff',
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },

  // utils
  utils: theme_utils,
}

export const themes: Themes = {
  light: theme_lightTheme,
  dark: theme_darkTheme,
}
