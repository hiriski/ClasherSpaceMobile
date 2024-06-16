import { StyleSheet } from 'react-native'

// theme config
import { theme_typography } from '@/configs'

export const typographyStyles = StyleSheet.create({
  baseStyle: {
    fontFamily: theme_typography.body1.fontFamily,
  },

  // variant
  typography_body1: {
    fontSize: theme_typography.body1.fontSize,
    fontWeight: theme_typography.body1.fontWeightRegular,
    lineHeight: theme_typography.body1.lineHeight,
  },
  typography_body2: {
    fontSize: theme_typography.body2.fontSize,
    fontWeight: theme_typography.body2.fontWeightRegular,
    lineHeight: theme_typography.body2.lineHeight,
  },
  typography_subtitle1: {
    fontSize: theme_typography.subtitle1.fontSize,
    fontWeight: theme_typography.subtitle1.fontWeightRegular,
    lineHeight: theme_typography.subtitle1.lineHeight,
  },
  typography_subtitle2: {
    fontSize: theme_typography.subtitle2.fontSize,
    fontWeight: theme_typography.subtitle2.fontWeightRegular,
    lineHeight: theme_typography.subtitle2.lineHeight,
  },
  typography_h1: {
    fontSize: theme_typography.h1.fontSize,
    fontWeight: theme_typography.h1.fontWeightRegular,
    lineHeight: theme_typography.h1.lineHeight,
  },
  typography_h2: {
    fontSize: theme_typography.h2.fontSize,
    fontWeight: theme_typography.h2.fontWeightRegular,
    lineHeight: theme_typography.h2.lineHeight,
  },
  typography_h3: {
    fontSize: theme_typography.h3.fontSize,
    fontWeight: theme_typography.h3.fontWeightRegular,
    lineHeight: theme_typography.h3.lineHeight,
  },
  typography_h4: {
    fontSize: theme_typography.h4.fontSize,
    fontWeight: theme_typography.h4.fontWeightRegular,
    lineHeight: theme_typography.h4.lineHeight,
  },
  typography_h5: {
    fontSize: theme_typography.h5.fontSize,
    fontWeight: theme_typography.h5.fontWeightRegular,
    lineHeight: theme_typography.h5.lineHeight,
  },
  typography_h6: {
    fontSize: theme_typography.h6.fontSize,
    fontWeight: theme_typography.h6.fontWeightRegular,
    lineHeight: theme_typography.h6.lineHeight,
  },
  typography_caption: {
    fontSize: theme_typography.caption.fontSize,
    fontWeight: theme_typography.caption.fontWeightRegular,
    lineHeight: theme_typography.caption.lineHeight,
  },
  typography_button: {
    fontSize: theme_typography.button.fontSize,
    fontWeight: theme_typography.button.fontWeightRegular,
    lineHeight: theme_typography.button.lineHeight,
  },
  typography_overline: {
    fontSize: theme_typography.overline.fontSize,
    fontWeight: theme_typography.overline.fontWeightRegular,
    lineHeight: theme_typography.overline.lineHeight,
  },

  // font weight

  typography_fontWeightExtraLight: {
    fontWeight: theme_typography.body1.fontWeightLight,
  },
  typography_fontWeightLight: {
    fontWeight: theme_typography.body1.fontWeightLight,
  },
  typography_fontWeightRegular: {
    fontWeight: theme_typography.body1.fontWeightRegular,
  },
  typography_fontWeightMedium: {
    fontWeight: theme_typography.body1.fontWeightMedium,
  },
  typography_fontWeightSemiBold: {
    fontWeight: theme_typography.body1.fontWeightBold,
  },
  typography_fontWeightBold: {
    fontWeight: theme_typography.body1.fontWeightBold,
  },
})
