import React, { FC } from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'

// hooks.
import { useTheme } from '@/hooks'

// interfaces
import { TypographyColor, TypographyVariant } from '@/interfaces'

// helpers
import { createSpacing } from '@/helpers'

// styles
import { typographyStyles as styles } from './typography.style'

export interface TypographyProps extends Omit<TextProps, 'style'> {
  style?: TextStyle
  variant?: TypographyVariant
  fontWeight?: TextStyle['fontWeight']
  color?: TypographyColor
  gutterBottom?: boolean | number
}

const Typography: FC<TypographyProps> = props => {
  const { children, variant, fontWeight, color, gutterBottom, style, ...rest } = props
  const theme = useTheme()

  return (
    <Text
      {...rest}
      style={StyleSheet.flatten([
        styles.baseStyle,
        {
          marginBottom: gutterBottom ? createSpacing(typeof gutterBottom === 'number' ? Number(gutterBottom) : 1) : 0,
        },
        {
          // variant
          ...(variant === 'h1' && styles.typography_h1),
          ...(variant === 'h2' && styles.typography_h2),
          ...(variant === 'h3' && styles.typography_h3),
          ...(variant === 'h4' && styles.typography_h4),
          ...(variant === 'h5' && styles.typography_h5),
          ...(variant === 'h5' && styles.typography_h5),
          ...(variant === 'body1' && styles.typography_body1),
          ...(variant === 'body2' && styles.typography_body2),
          ...(variant === 'subtitle1' && styles.typography_subtitle1),
          ...(variant === 'subtitle2' && styles.typography_subtitle2),
          ...(variant === 'caption' && styles.typography_caption),
          ...(variant === 'button' && styles.typography_button),
          ...(variant === 'overline' && styles.typography_overline),

          // font weight
          ...(fontWeight === '200' && styles.typography_fontWeightExtraLight),
          ...(fontWeight === '300' && styles.typography_fontWeightLight),
          ...(fontWeight === 'normal' && styles.typography_fontWeightRegular),
          ...(fontWeight === '400' && styles.typography_fontWeightRegular),
          ...(fontWeight === '500' && styles.typography_fontWeightMedium),
          ...(fontWeight === '600' && styles.typography_fontWeightSemiBold),
          ...(fontWeight === '700' && styles.typography_fontWeightBold),
          ...(fontWeight === 'bold' && styles.typography_fontWeightBold),

          // colors
          ...(color === 'text.primary' && { color: theme.palette.text.primary }),
          ...(color === 'text.secondary' && { color: theme.palette.text.secondary }),
          ...(color === 'text.disabled' && { color: theme.palette.text.disabled }),

          ...(color === 'primary.main' && { color: theme.palette.primary.main }),
          ...(color === 'primary.dark' && { color: theme.palette.primary.dark }),
          ...(color === 'primary.light' && { color: theme.palette.primary.light }),

          ...(color === 'secondary.main' && { color: theme.palette.secondary.main }),
          ...(color === 'secondary.dark' && { color: theme.palette.secondary.dark }),
          ...(color === 'secondary.light' && { color: theme.palette.secondary.light }),

          // common
          ...(color === 'common.white' && { color: theme.palette.common.white }),
          ...(color === 'common.black' && { color: theme.palette.common.black }),

          // spread custom styles
          ...style,
        },
      ])}
    >
      {children}
    </Text>
  )
}

Typography.defaultProps = {
  variant: 'body1',
  gutterBottom: false,
  fontWeight: 'normal',
  color: 'text.primary',
}

export default Typography
