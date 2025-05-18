import { TextStyle } from 'react-native'

import { theme_breakpoints, theme_brandPalette, theme_shape } from '@/configs/unistyles-theme.config'

export type ThemeBreakpoints = typeof theme_breakpoints

export type ThemeSpacing = number

export type ThemeBrandPalette = typeof theme_brandPalette

export type ThemeShape = typeof theme_shape

export type ThemePaletteMode = 'light' | 'dark'

export type ThemeSize = 'small' | 'medium' | 'large' | 'extra-large'

export type ThemeTypographyVariant = 'body' | 'subtitle' | 'caption' | 'button' | 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1'

export type ThemeTypographyColor =
  | 'text.primary'
  | 'text.secondary'
  | 'text.disabled'
  | 'primary.main'
  | 'primary.dark'
  | 'primary.light'
  | 'secondary.main'
  | 'secondary.dark'
  | 'secondary.light'
  | 'common.white'
  | 'common.black'

export interface ThemeFontStyles
  extends Required<{
    fontFamily: TextStyle['fontFamily']
    fontSize: TextStyle['fontSize']
    fontWeightLight: TextStyle['fontWeight']
    fontWeightRegular: TextStyle['fontWeight']
    fontWeightMedium: TextStyle['fontWeight']
    fontWeightBold: TextStyle['fontWeight']
    lineHeight: TextStyle['lineHeight']
    letterSpacing: TextStyle['letterSpacing']
  }> {}

export type ThemeTypographyStyle = TextStyle

export type ThemeTypographyStyleOptions = {
  allVariants: ThemeFontStyles
}

export interface ThemeTypographyOptions extends Record<ThemeTypographyVariant, ThemeFontStyles> {}

export type ThemeTextColor = {
  primary: string
  secondary: string
  disabled: string
}

export type ThemePaletteOptions = {
  main: string
  light: string
  dark: string
  contrastText: string
}

export type ThemeBackgroundPalette = {
  default: string
  paper: string
}

export type ThemeCommonColor = {
  white: string
  black: string
}

export type ThemePaletteActions = {
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  selectedOpacity: number
  disabled: string
  disabledOpacity: number
  disabledBackground: string
  focus: string
  focusOpacity: number
  activatedOpacity: number
}

export type ThemePalette = {
  // mode: ThemePaletteMode
  primary: ThemePaletteOptions
  secondary: ThemePaletteOptions
  success: ThemePaletteOptions
  info: ThemePaletteOptions
  warning: ThemePaletteOptions
  error: ThemePaletteOptions
  common: ThemeCommonColor
  text: ThemeTextColor
  background: ThemeBackgroundPalette
  divider: string
  action: ThemePaletteActions
}

export type ThemeUtils = {
  createSpacing: (unit?: number) => number
}

export type Theme = {
  spacing: ThemeSpacing
  shape: ThemeShape
  palette: ThemePalette
  typography: ThemeTypographyOptions
  utils: ThemeUtils
}

export type Themes = {
  light: Theme
  dark: Theme
}
