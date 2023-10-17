/**
 * --------------------
 * App Theme Config.
 * Inspired by @mui/material
 * --------------------
 */

import { TextStyle } from 'react-native'

// interfaces.
import { IFontStyle, IThemePalette, IThemeShape, IThemeTypographyOptions, ThemeSpacing } from '@/interfaces'

// libs
import { grey } from '@/libs'

const DEFAULT_FONT_FAMILY = 'Plus Jakarta Sans'

/**  Base palette */
export const theme_paletteBase: Pick<IThemePalette, 'primary' | 'secondary' | 'common'> = {
  primary: {
    main: '#0563ff',
    dark: '#034CDB',
    light: '#DEEFFE',
    contrastText: '#fbfbfb',
  },
  secondary: {
    main: '#E91C63',
    dark: '#C81464',
    light: '#FEE3E2',
    contrastText: '#fbfbfb',
  },
  common: {
    white: '#ffffff',
    black: '#000000',
  },
}

/** Palette light */
export const theme_paletteLight: Omit<IThemePalette, 'common' | 'primary' | 'secondary'> = {
  mode: 'light',
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
}

/** Palette dark */
export const theme_paletteDark: Omit<IThemePalette, 'common' | 'primary' | 'secondary'> = {
  mode: 'dark',
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
}

// prettier-ignore
const theme_typographyFontWeight: Record<keyof Pick<IFontStyle, | 'fontWeightLight' | 'fontWeightRegular' | 'fontWeightMedium' | 'fontWeightBold'>, TextStyle['fontWeight']> = {
  fontWeightLight: '300',
  fontWeightRegular: '500',
  fontWeightMedium: '600',
  fontWeightBold: '700',
}

/** Typography */
export const theme_typography: IThemeTypographyOptions = {
  h1: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h2: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h3: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h4: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h5: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  h6: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 14.2,
    lineHeight: 22,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  body1: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  body2: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  subtitle1: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  subtitle2: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 11.2,
    lineHeight: 17,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  caption: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  button: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
  overline: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.2,
    ...theme_typographyFontWeight,
  },
}

/** Shape */
export const theme_shape: IThemeShape = {
  borderRadius: 4,
}

/** Theme spacing */
export const theme_spacing: ThemeSpacing = 4

export const theme_horizontalSpacing: ThemeSpacing = 24

export const themeConfig = {
  paletteBase: theme_paletteBase,
  paletteLight: theme_paletteLight,
  paletteDark: theme_paletteDark,
  typography: theme_typography,
  shape: theme_shape,
  spacing: theme_spacing,
  horizontalSpacing: theme_horizontalSpacing,
}
