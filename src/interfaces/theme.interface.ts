import { TextStyle } from 'react-native'

export type PaletteMode = 'light' | 'dark'
export type ThemeSize = 'small' | 'medium' | 'large'
export type ThemeSpacing = number

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'

export type TypographyColor =
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

// prettier-ignore
export interface IFontStyle extends Required<{
  fontFamily: TextStyle['fontFamily']
  fontSize: TextStyle['fontSize']
  fontWeightLight: TextStyle['fontWeight']
  fontWeightRegular: TextStyle['fontWeight']
  fontWeightMedium: TextStyle['fontWeight']
  fontWeightBold: TextStyle['fontWeight']
  lineHeight: TextStyle['lineHeight']
  letterSpacing: TextStyle['letterSpacing']
}> {}

export type TypographyStyle = TextStyle

export interface TypographyStyleOptions {
  allVariants: IFontStyle
}

// prettier-ignore
export interface IThemeTypographyOptions extends Record<TypographyVariant, IFontStyle> {}

export interface IThemeShape {
  borderRadius: number
}

export interface IThemeTextPalette {
  primary: string
  secondary: string
  disabled: string
}

export interface IThemePaletteOptions {
  main: string
  light: string
  dark: string
  contrastText: string
}

export interface IThemeBackgroundPalette {
  default: string
  paper: string
}

export interface IThemeCommonPalette {
  white: string
  black: string
}

export interface IThemePaletteAction {
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

export interface IThemePalette {
  mode: PaletteMode
  primary: IThemePaletteOptions
  secondary: IThemePaletteOptions
  success: IThemePaletteOptions
  info: IThemePaletteOptions
  warning: IThemePaletteOptions
  error: IThemePaletteOptions
  common: IThemeCommonPalette
  text: IThemeTextPalette
  background: IThemeBackgroundPalette
  divider: string
  action: IThemePaletteAction
}

export interface ITheme {
  palette: IThemePalette
  typography: IThemeTypographyOptions
  shape: IThemeShape
  spacing: ThemeSpacing
  horizontalSpacing: ThemeSpacing
}
