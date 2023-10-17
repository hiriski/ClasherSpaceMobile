import { TextStyle } from 'react-native'
import { IThemeTypographyVariant } from '@/interfaces'

export const getTypographyFontSize = (variant: keyof IThemeTypographyVariant): number => {
  switch (variant) {
    case 'h1':
      return 24
    case 'h2':
      return 22
    case 'h3':
      return 20
    case 'h4':
      return 18
    case 'h5':
      return 16
    case 'h6':
      return 13
    case 'body':
      return 13
    case 'body2':
      return 12.75
    case 'subtitle':
      return 11.5
    case 'subtitle2':
      return 11.2
    default:
      return 12.5
  }
}

export const getTypographyFontWeight = (variant: keyof IThemeTypographyVariant): TextStyle['fontWeight'] => {
  switch (variant) {
    case 'h1':
      return '600'
    case 'h2':
      return '600'
    case 'h3':
      return '600'
    case 'h4':
      return '600'
    case 'h5':
      return '600'
    case 'h6':
      return '600'
    case 'body':
      return '500'
    case 'body2':
      return '600'
    case 'subtitle':
      return '500'
    case 'subtitle2':
      return '600'
    default:
      return '500'
  }
}
