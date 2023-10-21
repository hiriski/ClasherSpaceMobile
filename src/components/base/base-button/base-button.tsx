import React, { FC, ReactNode } from 'react'
import { StyleSheet, Pressable, PressableProps, ViewStyle, TextStyle, View } from 'react-native'

// base components.
import { Typography } from '@/components/core/typography'

// interfaces
import { ThemeSize } from '@/interfaces'

// theme config
import { themeConfig, theme_shape } from '@/config/theme.config'

// utils
import { themeHelpers } from '@/helpers/theme.helper'

export type BaseButtonSize = ThemeSize | 'extra-large'

export interface BaseButtonProps extends Omit<PressableProps, 'style'> {
  title: string
  size?: BaseButtonSize
  renderStartAdornment?: ReactNode
  renderEndAdornment?: ReactNode
  style?: ViewStyle
  pressedStyle?: ViewStyle
  textStyle?: TextStyle
}

/**
 * Base Button Component without variant, color
 */
const BaseButton: FC<BaseButtonProps> = (props): JSX.Element => {
  const { title, size, renderStartAdornment, renderEndAdornment, style, pressedStyle, textStyle, ...rest } = props

  return (
    <Pressable
      {...rest}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.buttonRoot,

          { ...(size === 'small' && styles.button_small) },
          { ...(size === 'medium' && styles.button_medium) },
          { ...(size === 'large' && styles.button_large) },
          { ...(size === 'extra-large' && styles.button_extraLarge) },

          /** Style props */
          { ...style },

          /** Pressed style props */
          pressed && pressedStyle,
        ])
      }
    >
      <View style={styles.buttonContainer}>
        {renderStartAdornment}
        <Typography
          style={StyleSheet.flatten([
            styles.buttonText,
            { ...(size === 'small' && styles.buttonText_small) },
            { ...(size === 'medium' && styles.buttonText_medium) },
            { ...(size === 'large' && styles.buttonText_large) },
            { ...(size === 'extra-large' && styles.buttonText_extraLarge) },
            {
              /** Text style props */
              ...textStyle,
            },
          ])}
        >
          {title}
        </Typography>
        {renderEndAdornment}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonRoot: {
    borderRadius: theme_shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: themeConfig.typography.button.letterSpacing,
    fontWeight: themeConfig.typography.button.fontWeightRegular,
    fontFamily: themeConfig.typography.button.fontFamily,
    lineHeight: themeConfig.typography.button.lineHeight,
  },

  button_small: {
    height: 32,
    paddingHorizontal: themeHelpers.createSpacing(3.2),
  },
  button_medium: {
    height: 40,
    paddingHorizontal: themeHelpers.createSpacing(3.8),
  },
  button_large: {
    height: 44,
    paddingHorizontal: themeHelpers.createSpacing(4.4),
  },
  button_extraLarge: {
    height: 52,
    paddingHorizontal: themeHelpers.createSpacing(5),
  },

  buttonText_small: {
    fontSize: 12,
    lineHeight: 14,
  },
  buttonText_medium: {
    fontSize: 13.2,
    lineHeight: 17.5,
  },
  buttonText_large: {
    fontSize: 14,
    lineHeight: 16,
  },
  buttonText_extraLarge: {
    fontSize: 15,
    lineHeight: 18,
  },
})

BaseButton.defaultProps = {
  size: 'medium',
}

export default BaseButton
