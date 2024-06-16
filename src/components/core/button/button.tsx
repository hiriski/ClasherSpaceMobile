import React, { FC, ReactElement, ReactNode } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

// base components.
import { BaseButton, BaseButtonProps } from '@/components/base'

// theme lib
import { common, grey } from '@/libs'

// icon components.
import { FeatherIcon, Ionicon, MaterialCommunityIcon, MaterialIcon } from '@/components/core/icons'

// utils
import { themeHelpers } from '@/helpers'

// Interfaces.
import { AdornmentIconTypeButton, ButtonColor, ButtonVariant } from './button.interface'

// hooks
import { useTheme } from '@/hooks'

// config
import { appConfig, themeConfig } from '@/configs'

export interface CoreButtonProps extends BaseButtonProps {
  color?: ButtonColor
  variant?: ButtonVariant
  rounded?: boolean
  startIcon?: string
  endIcon?: string
  iconType?: AdornmentIconTypeButton
  isLoading?: boolean
  disablePadding?: boolean
}

const Button: FC<CoreButtonProps> = (props): JSX.Element => {
  const { variant, rounded, color, isLoading, style, startIcon, endIcon, iconType, disablePadding, ...rest } = props
  const { palette } = useTheme()

  const renderSpinner = (): ReactElement => {
    let spinnerSize = 0
    switch (props.size) {
      case 'small':
        spinnerSize = 12
        break
      case 'medium':
        spinnerSize = 16
        break
      case 'large':
        spinnerSize = 18
        break
      case 'extra-large':
        spinnerSize = 20
        break
      default:
        spinnerSize = 16
        break
    }
    return (
      <ActivityIndicator
        style={styles.spinnerStyle}
        size={spinnerSize}
        color={
          variant === 'contained'
            ? themeHelpers.getContrastTextColor(color as ButtonColor, palette)
            : themeHelpers.getMainColor(color as ButtonColor, palette)
        }
      />
    )
  }

  const renderIcon = (placement: 'start' | 'end'): ReactNode => {
    const getIconSize = () => {
      if (props.size === 'small') {
        return 16
      }
      if (props.size === 'medium') {
        return 18
      }
      if (props.size === 'large') {
        return 20
      }
      if (props.size === 'extra-large') {
        return 22
      }
      return 18
    }
    if (iconType === 'ionicons') {
      return (
        <Ionicon
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeHelpers.getContrastTextColor(color as ButtonColor, palette)
              : themeHelpers.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      )
    } else if (iconType === 'material-community-icons') {
      return (
        <MaterialCommunityIcon
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeHelpers.getContrastTextColor(color as ButtonColor, palette)
              : themeHelpers.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      )
    } else if (iconType === 'material-icons') {
      return (
        <MaterialIcon
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeHelpers.getContrastTextColor(color as ButtonColor, palette)
              : themeHelpers.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      )
    } else if (iconType === 'feather') {
      return (
        <FeatherIcon
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeHelpers.getContrastTextColor(color as ButtonColor, palette)
              : themeHelpers.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      )
    } else {
      return null
    }
  }

  return (
    <BaseButton
      /**
       * Button styles.
       */
      style={StyleSheet.flatten([
        styles.buttonRoot,
        {
          // Rounded button
          ...(rounded && {
            borderRadius: 50,
          }),

          // Button color for variant contained
          ...(variant === 'contained' && {
            // prettier-ignore
            backgroundColor: themeHelpers.getMainColor(color as ButtonColor, palette),
            // prettier-ignore
            borderColor: themeHelpers.getMainColor(color as ButtonColor, palette),
          }),

          // Button color for variant outlined
          // prettier-ignore
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            borderColor: themeHelpers.getMainColor(color as ButtonColor, palette),
          }),

          // Button color for variant text
          ...(variant === 'text' && {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            ...(disablePadding && { paddingHorizontal: 0, height: 'auto' }),
          }),

          // Button style for disabled button
          ...(props.disabled && {
            backgroundColor: palette.mode === 'light' ? grey[300] : grey[900],
            borderColor: palette.mode === 'light' ? grey[300] : grey[900],
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
          ...(variant === 'contained' && {
            // prettier-ignore
            backgroundColor: themeHelpers.getDarkenColor(color as ButtonColor, palette),
            // prettier-ignore
            borderColor: themeHelpers.getDarkenColor(color as ButtonColor, palette),
          }),

          // Pressed button color for variant outlined
          ...(variant === 'outlined' && {
            backgroundColor:
              palette.mode === 'light' ? themeHelpers.getLightenColor(color as ButtonColor, palette) : 'rgba(255, 255, 255, 0.1)',
          }),

          // Button color for variant text
          ...(variant === 'text' && {
            opacity: 0.75,
          }),

          // Pressed button color for variant text
          // ...(variant === 'text' && {
          //   backgroundColor: 'transparent',
          // }),
        },
        { ...style },
      ])}
      /**
       * Button text style
       */
      textStyle={StyleSheet.flatten([
        styles.buttonTextStyle,
        {
          /* I don't need spacing in typography anymore. */
          // ...(startIcon && {
          //   marginLeft: createSpacing(1.8),
          // }),
          // ...(endIcon && {
          //   marginRight: createSpacing(1.8),
          // }),

          // Text button color for variant button outlined
          ...(variant === 'outlined' && {
            color: themeHelpers.getMainColor(color as ButtonColor, palette),
          }),

          // Text button color for variant button text
          ...(variant === 'text' && {
            color: themeHelpers.getMainColor(color as ButtonColor, palette),
          }),

          ...(props.disabled && {
            color: palette.mode === 'light' ? grey[500] : grey[600],
          }),
        },
      ])}
      /**
       * Start & End Adornment
       */
      renderStartAdornment={isLoading ? renderSpinner() : startIcon && renderIcon('start')}
      renderEndAdornment={endIcon && renderIcon('end')}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  buttonRoot: {
    borderWidth: 1.2,
    borderStyle: 'solid',
  },
  buttonTextStyle: {
    color: common.white,
    fontWeight: themeConfig.typography.button.fontWeightMedium,
  },
  spinnerStyle: {
    marginRight: themeHelpers.createSpacing(1.5),
  },
  iconButtonPlacementLeft: {
    marginRight: themeHelpers.createSpacing(1.6),
  },
  iconButtonPlacementRight: {
    marginLeft: themeHelpers.createSpacing(1.6),
  },
})

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  rounded: false,
  variant: 'contained',
  isLoading: false,
  startIcon: undefined,
  endIcon: undefined,
  iconType: appConfig.defaultVectorIcon as AdornmentIconTypeButton,
  disablePadding: false,
}

export default Button
