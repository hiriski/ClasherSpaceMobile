import React, { FC } from 'react'
import { StyleSheet, Pressable, PressableProps, ViewStyle } from 'react-native'

// interfaces
import { ThemeSize } from '@/interfaces'

export type IconBaseButtonSize = ThemeSize | 'extra-large'

export interface BaseIconButtonProps extends Omit<PressableProps, 'style'> {
  size?: IconBaseButtonSize
  style?: ViewStyle
  pressedStyle?: ViewStyle
}

const BaseIconButton: FC<BaseIconButtonProps> = (props): JSX.Element => {
  const { size, children, style, pressedStyle, ...rest } = props

  return (
    <Pressable
      {...rest}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.buttonRoot,

          size === 'small' && {
            height: 28,
            width: 28,
            borderRadius: 28,
          },
          size === 'medium' && {
            height: 38,
            width: 38,
            borderRadius: 38,
          },
          size === 'large' && {
            height: 48,
            width: 48,
            borderRadius: 48,
          },
          size === 'extra-large' && {
            height: 54,
            width: 54,
            borderRadius: 54,
          },

          /** Style props */
          { ...style },

          /** Pressed style props */
          pressed && pressedStyle,
        ])
      }
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonRoot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

BaseIconButton.defaultProps = {
  size: 'medium',
}

export default BaseIconButton
