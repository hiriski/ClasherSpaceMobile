import _ from 'lodash'

// theme config
import { themeConfig } from '@/config'

// interfaces
import { ITheme, IThemePalette, PaletteMode } from '@/interfaces'

// colors utils
import JiaminghiColor from '@jiaminghi/color'

/**
 * create theme
 * @param mode "light" | "dark"
 * @returns ITheme
 */
export const createTheme = (mode: PaletteMode): ITheme => {
  return {
    palette:
      mode === 'dark'
        ? _.merge(themeConfig.paletteBase, themeConfig.paletteDark)
        : _.merge(themeConfig.paletteBase, themeConfig.paletteLight),
    typography: themeConfig.typography,
    shape: themeConfig.shape,
    spacing: themeConfig.spacing,
    horizontalSpacing: themeConfig.horizontalSpacing,
  }
}

/**
 * Is dark mode
 *
 * @param {ITheme} theme
 * @returns {boolean}
 */
export const isDarkMode = (theme: ITheme): boolean => theme.palette.mode === 'dark'

/**
 * Get main  color.
 *
 * @param {keyof IThemePalette | string} color
 * @param {IThemePalette} palette
 * @returns
 */
export const getMainColor = (color: keyof IThemePalette, palette: IThemePalette): string => {
  if (color && palette) {
    switch (color) {
      case 'primary':
        return palette.primary.main
      case 'secondary':
        return palette.secondary.main
      case 'success':
        return palette.success.main
      case 'info':
        return palette.info.main
      case 'warning':
        return palette.warning.main
      case 'error':
        return palette.error.main
      default:
        return palette.primary.main
    }
  } else {
    return palette.primary.main
  }
}

/**
 * Get darken color.
 *
 * @param {keyof IThemePalette | string} color
 * @param {IThemePalette} palette
 * @returns
 */
export const getDarkenColor = (color: keyof IThemePalette, palette: IThemePalette): string => {
  if (color && palette) {
    switch (color) {
      case 'primary':
        return palette.primary.dark
      case 'secondary':
        return palette.secondary.dark
      case 'success':
        return palette.success.dark
      case 'info':
        return palette.info.dark
      case 'warning':
        return palette.warning.dark
      case 'error':
        return palette.error.dark
      default:
        return palette.primary.dark
    }
  } else {
    return palette.common.black
  }
}

/**
 * Get lighen color.
 *
 * @param {keyof IThemePalette | string} color
 * @param {IThemePalette} palette
 * @returns
 */
export const getLightenColor = (color: keyof IThemePalette | string, palette: IThemePalette): string => {
  if (color && palette) {
    switch (color) {
      case 'primary':
        return palette.primary.light
      case 'secondary':
        return palette.secondary.light
      case 'success':
        return palette.success.light
      case 'info':
        return palette.info.light
      case 'warning':
        return palette.warning.light
      case 'error':
        return palette.error.light
      default:
        return palette.primary.light
    }
  } else {
    return palette.common.white
  }
}

/**
 * Get contrast text color.
 *
 * @param {keyof IThemePalette | string} color
 * @param {IThemePalette} palette
 * @returns
 */
export const getContrastTextColor = (color: keyof IThemePalette, palette: IThemePalette): string => {
  if (color && palette) {
    switch (color) {
      case 'primary':
        return palette.primary.contrastText
      case 'secondary':
        return palette.secondary.contrastText
      case 'success':
        return palette.success.contrastText
      case 'info':
        return palette.info.contrastText
      case 'warning':
        return palette.warning.contrastText
      case 'error':
        return palette.error.contrastText
      default:
        return palette.primary.contrastText
    }
  } else {
    return palette.common.white
  }
}

/**
 * Create theme spacing
 * @param {number} spacing
 * @returns {number}
 */
export const createSpacing = (spacing: number): number => {
  if (!spacing) {
    return 0
  }
  return spacing * themeConfig.spacing
}

/**
 * @description Lighten color
 * @param {String} color Hex|Rgb|Rgba color or color keyword
 * @return {Number} Percent of brighten (1-100)
 * @return {String|Boolean} Rgba color (Invalid input will return false)
 */
export const lighten = (color: string, opacity: number): string => {
  return JiaminghiColor.lighten(color, opacity)
}

/**
 * @description Darken color
 * @param {String} color Hex|Rgb|Rgba color or color keyword
 * @return {Number} Percent of brighten (1-100)
 * @return {String|Boolean} Rgba color (Invalid input will return false)
 */
export const darken = (color: string, opacity: number): string => {
  return JiaminghiColor.darken(color, opacity)
}

export const themeHelpers = {
  createTheme,
  isDarkMode,
  createSpacing,
  getMainColor,
  getDarkenColor,
  getLightenColor,
  getContrastTextColor,
  lighten,
  darken,
}
