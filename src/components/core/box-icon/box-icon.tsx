import React, { FC } from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'

// components
import { Icon } from '@/components/core'

// utils
import { themeHelpers } from '@/helpers'

// config
import { themeConfig } from '@/configs'

// hooks
import { useTheme } from '@/hooks'
import { RNVectorIconProvider } from '@/interfaces'

interface BoxIconProps {
  iconType?: RNVectorIconProvider
  icon?: string
  style?: ViewStyle
  color?: string
  size?: 'small' | 'medium' | 'large' | 'extra-large'
}

const getBoxSize = (size: BoxIconProps['size']): number => {
  switch (size) {
    case 'small':
      return 34
    case 'medium':
      return 44
    case 'large':
      return 54
    case 'extra-large':
      return 64
    default:
      return 44
  }
}

const getIconSize = (size: BoxIconProps['size']): number => {
  switch (size) {
    case 'small':
      return 20
    case 'medium':
      return 24
    case 'large':
      return 28
    case 'extra-large':
      return 32
    default:
      return 24
  }
}

const BoxIcon: FC<BoxIconProps> = (props): JSX.Element => {
  const { iconType, icon, color, size, style } = props
  const theme = useTheme()
  return (
    <View
      style={StyleSheet.flatten([
        {
          ...styles.root,
          backgroundColor: themeHelpers.lighten(color as string, 70),
          height: getBoxSize(size),
          width: getBoxSize(size),
          borderRadius: getBoxSize(size),
        },
        { ...style },
      ])}
    >
      <Icon provider={iconType as RNVectorIconProvider} name={icon as string} color={color} size={getIconSize(size)} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

BoxIcon.defaultProps = {
  iconType: 'ionicons',
  color: themeConfig.paletteBase.primary.main,
  size: 'medium',
}

export default BoxIcon
