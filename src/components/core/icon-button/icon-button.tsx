import React, { FC, ReactElement, ReactNode, useMemo } from 'react'
import { StyleSheet, ActivityIndicator, TextStyle, ColorValue } from 'react-native'

// base components.
import { BaseIconButton, BaseIconButtonProps } from '@/components/base'

// libs
import { grey } from '@/libs'

// icon components.
import { Ionicon, MaterialCommunityIcon, MaterialIcon, FeatherIcon } from '@/components/core/icons'

// hooks
import { useTheme } from '@/hooks'

// utils
import { themeHelpers } from '@/helpers'

// interfaces.
import { IconTypeIconButton, IconButtonColor, IconButtonVariant } from './icon-button.interface'
import { IThemePalette } from '@/interfaces'
import { appConfig } from '@/configs'

// App config.

export interface IconButtonProps extends BaseIconButtonProps {
  color?: IconButtonColor
  variant?: IconButtonVariant
  icon?: string
  iconType?: IconTypeIconButton
  iconSize?: number
  iconColor?: ColorValue
  iconStyle?: TextStyle
  isLoading?: boolean
}

export const IconButton: FC<IconButtonProps> = (props): JSX.Element => {
  const { variant, color, isLoading, style, iconType, icon, iconSize, iconColor, iconStyle, ...rest } = props
  const { palette } = useTheme()

  const getIconColor = useMemo(() => {
    if (iconColor) {
      return iconColor
    }
    return color === 'default'
      ? palette.text.secondary
      : variant === 'contained'
      ? themeHelpers.getContrastTextColor(color as keyof IThemePalette, palette)
      : themeHelpers.getMainColor(color as keyof IThemePalette, palette)
  }, [color, iconColor, variant])

  const renderSpinner = (): ReactElement => {
    let spinnerSize = 18
    switch (props.size) {
      case 'small':
        spinnerSize = 18
        break
      case 'medium':
        spinnerSize = 22
        break
      case 'large':
        spinnerSize = 26
        break
      case 'extra-large':
        spinnerSize = 26
        break
      default:
        break
    }
    return <ActivityIndicator style={styles.spinnerStyle} size={spinnerSize} color={getIconColor} />
  }

  const renderIcon = (): ReactNode => {
    const getIconSize = () => {
      if (!iconSize) {
        if (props.size === 'small') {
          return 18
        }
        if (props.size === 'medium') {
          return 22
        }
        if (props.size === 'large') {
          return 26
        }
        if (props.size === 'extra-large') {
          return 28
        }
        return 18
      } else {
        return iconSize
      }
    }
    if (iconType === 'ionicons') {
      return (
        <Ionicon name={String(icon)} size={getIconSize()} color={getIconColor} style={StyleSheet.flatten([{ ...iconStyle }])} />
      )
    } else if (iconType === 'material-community-icons') {
      return <MaterialCommunityIcon name={String(icon)} size={getIconSize()} color={getIconColor} style={iconStyle} />
    } else if (iconType === 'material-icons') {
      return <MaterialIcon name={String(icon)} size={getIconSize()} color={getIconColor} style={iconStyle} />
    } else if (iconType === 'feather') {
      return <FeatherIcon name={String(icon)} size={getIconSize()} color={getIconColor} style={iconStyle} />
    } else {
      return null
    }
  }

  return (
    <BaseIconButton
      /**
       * Button styles.
       */
      style={StyleSheet.flatten([
        styles.buttonRoot,
        {
          // Button color for variant contained
          ...(variant === 'contained' &&
            color === 'default' && {
              backgroundColor: palette.mode === 'light' ? grey[200] : 'rgba(255, 255, 255, 0.1)',
            }),
          ...(variant === 'contained' &&
            color !== 'default' && {
              backgroundColor: themeHelpers.getMainColor(color as keyof IThemePalette, palette),
            }),

          // Button color for variant outlined
          ...(variant === 'default' && {
            backgroundColor: 'transparent',
          }),
        },
        { ...style },
      ])}
      /**
       * Pressed style
       */
      pressedStyle={StyleSheet.flatten([
        {
          // Pressed button color for variant contained
          ...(variant === 'contained' &&
            color === 'default' && {
              backgroundColor: palette.mode === 'light' ? grey[300] : 'rgba(255, 255, 255, 0.2)',
            }),
          ...(variant === 'contained' &&
            color !== 'default' && {
              backgroundColor: themeHelpers.getDarkenColor(color as keyof IThemePalette, palette),
            }),

          // Pressed button color for variant outlined
          ...(variant === 'default' &&
            color === 'default' && {
              backgroundColor: palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            }),
          ...(variant === 'default' &&
            color !== 'default' && {
              backgroundColor:
                palette.mode === 'light'
                  ? themeHelpers.getLightenColor(color as keyof IThemePalette, palette)
                  : 'rgba(255, 255, 255, 0.1)',
            }),
        },
        { ...style },
      ])}
      {...rest}
    >
      {isLoading ? renderSpinner() : renderIcon()}
    </BaseIconButton>
  )
}

const styles = StyleSheet.create({
  buttonRoot: {},
  spinnerStyle: {},
})

IconButton.defaultProps = {
  color: 'default',
  size: 'medium',
  variant: 'default',
  isLoading: false,
  icon: undefined,
  iconSize: undefined,
  iconType: appConfig.defaultVectorIcon as IconTypeIconButton,
}

export default IconButton
