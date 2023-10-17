import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, View, TextInput, TextInputProps, TextStyle } from 'react-native'

// theme config.
import { themeConfig, theme_shape } from '@/config'

// core components.
import { Typography } from '@/components/core'

// hooks
import { useTheme } from '@/hooks'

// theme libs.
import { grey, red } from '@/libs'

// interfaces
import { IThemePalette, ThemeSize } from '@/interfaces'

// helpers / utils.
import { themeHelpers } from '@/helpers'

export type TextFieldVariant = 'filled' | 'outlined'

export type TextFieldColor = keyof Pick<IThemePalette, 'primary' | 'secondary'>

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  size?: ThemeSize
  margin?: 'none' | 'dense' | 'normal'
  variant?: TextFieldVariant
  rounded?: boolean
  color?: TextFieldColor
  label?: string
  labelSize?: ThemeSize
  labelStyle?: TextStyle
  style?: TextStyle
  isError?: boolean
  isValid?: boolean
  helperText?: string
  fullWidth?: boolean
}

const TextField: FC<TextFieldProps> = (props): JSX.Element => {
  const { size, margin, variant, rounded, style, label, labelSize, labelStyle, isError, isValid, helperText, multiline, ...rest } =
    props
  const { palette } = useTheme()

  const isDarkMode = palette.mode === 'dark'

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [isFocused])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [isFocused])

  return (
    <View
      style={StyleSheet.flatten([
        styles.textInput_root,
        // prettier-ignore
        {...(margin === 'none' && { marginBottom: 0 })},
        // prettier-ignore
        {...(margin === 'dense' && { marginBottom: themeHelpers.createSpacing(2) })},
        // prettier-ignore
        {...(margin === 'normal' && { marginBottom: themeHelpers.createSpacing(3) })},
      ])}
    >
      {/* --- input label --- */}
      {label && (
        <Typography
          style={StyleSheet.flatten([
            styles.label,
            { ...(labelSize === 'small' && styles.label_small) },
            { ...(labelSize === 'medium' && styles.label_medium) },
            { ...(labelSize === 'large' && styles.label_large) },
            {
              color: palette.text.secondary,
              fontWeight: '400',
              ...labelStyle,
            },
          ])}
        >
          {label}
        </Typography>
      )}

      {/* text input */}
      <TextInput
        {...rest}
        placeholderTextColor={palette.text.disabled}
        onFocus={handleFocus}
        onEndEditing={handleBlur}
        multiline={multiline}
        style={StyleSheet.flatten([
          styles.textInputBase,
          {
            color: palette.text.primary,
            ...style,
          },
          // rounded
          // prettier-ignore
          { ...(rounded && size === 'small' && { borderRadius: 36 }) },
          // prettier-ignore
          { ...(rounded && size === 'medium' && { borderRadius: 46 }) },
          // prettier-ignore
          { ...(rounded && size === 'large' && { borderRadius: 50 }) },

          // text input style
          { ...(size === 'small' && !multiline && styles.textInput_small) },
          { ...(size === 'medium' && !multiline && styles.textInput_medium) },
          { ...(size === 'large' && !multiline && styles.textInput_large) },

          // text input style multiline
          // prettier-ignore
          { ...(size === 'small' && multiline && styles.textInput_smallMultiline) },
          // prettier-ignore
          { ...(size === 'medium' && multiline && styles.textInput_mediumMultiline) },
          // prettier-ignore
          { ...(size === 'large' && multiline && styles.textInput_largeMultiline) },

          // styles for variant outlined
          // prettier-ignore
          {
            ...(variant === 'outlined' && props.editable && {
              backgroundColor: palette.background.paper,
              borderColor: palette.divider,
            }),
          },

          // Styles for variant outlined disabled.
          // prettier-ignore
          { ...(variant === 'outlined' && !props.editable && {
            backgroundColor: !isDarkMode ? grey[100] : grey[900],
            borderColor: !isDarkMode ? grey[200] : grey[900],
            color: palette.text.disabled,
          })},

          // Styles for variant outlined focused.
          // prettier-ignore
          {...(isFocused && variant === 'outlined' && { borderColor: palette.primary.main })},

          // Styles for variant outlined error.
          // prettier-ignore
          {...(variant === 'outlined' && isError && {
            borderColor: red[500],
            color: red[600],
          })},

          // Styles for variant outlined error focused
          // prettier-ignore
          {...(isFocused && variant === 'outlined' && isError && {
            borderColor: red[500],
            color: red[600],
          })},

          // Styles for variant outlined invalid.
          // prettier-ignore
          {...(variant === 'outlined' && isValid && {
            borderColor: palette.success.main,
            color: palette.success.dark,
          })},

          // Styles for variant filled
          // prettier-ignore
          {...(variant === 'filled' && {
            backgroundColor: !isDarkMode ? '#eaeaea' : grey[900],
            borderColor: !isDarkMode ? '#eaeaea' : grey[900],
          })},

          // Styles for variant filled disabled.
          // prettier-ignore
          {...(variant === 'filled' && !props.editable && {
            backgroundColor: !isDarkMode ? grey[300] : grey[800],
            borderColor: !isDarkMode ? grey[300] : grey[800],
            color: palette.text.disabled,
          })},

          // Styles for variant filled error.
          // prettier-ignore
          {...(variant === 'filled' && isError && {
            backgroundColor: 'rgba(255, 0, 0, 0.05)',
            borderColor: red[500],
            color: red[600],
          })},

          // Styles for variant filled invalid.
          // prettier-ignore
          {...(variant === 'filled' && isValid && {
            backgroundColor: palette.success.light,
            borderColor: palette.success.main,
            color: palette.success.dark,
          })},
        ])}
      />

      {/* --- Helper text --- */}
      {helperText && (
        <Typography
          style={StyleSheet.flatten([
            styles.helperText,
            {
              color: isError ? red[500] : palette.text.secondary,
            },
          ])}
          variant='body2'
        >
          {helperText}
        </Typography>
      )}
    </View>
  )
}

TextField.defaultProps = {
  size: 'medium',
  margin: 'normal',
  variant: 'outlined',
  rounded: false,
  color: 'primary',
  labelSize: 'small',
  editable: true,
  isError: false,
  isValid: false,
  helperText: undefined,
  multiline: false,
}

const styles = StyleSheet.create({
  textInput_root: {},

  textInputBase: {
    borderWidth: 1.3,
    borderRadius: theme_shape.borderRadius,
    fontWeight: '500',
  },

  textInput_small: {
    height: 36,
    fontSize: 12,
    paddingHorizontal: themeHelpers.createSpacing(3),
  },
  textInput_medium: {
    height: 42,
    fontSize: 13.8,
    paddingHorizontal: themeHelpers.createSpacing(3.6),
  },
  textInput_large: {
    height: 50,
    fontSize: 15,
    paddingHorizontal: themeHelpers.createSpacing(4.4),
  },

  textInput_smallMultiline: {
    minHeight: 32,
    fontSize: 12,
    paddingHorizontal: themeHelpers.createSpacing(3),
  },
  textInput_mediumMultiline: {
    minHeight: 40,
    fontSize: 13.8,
    paddingHorizontal: themeHelpers.createSpacing(3.6),
  },
  textInput_largeMultiline: {
    minHeight: 46,
    fontSize: 15,
    paddingHorizontal: themeHelpers.createSpacing(4.4),
  },

  label: {
    marginBottom: themeHelpers.createSpacing(1),
  },
  label_small: {
    fontSize: 11,
  },
  label_medium: {
    fontSize: 13,
  },
  label_large: {
    fontSize: 15,
  },
  helperText: {
    fontSize: themeConfig.typography.subtitle1.fontSize,
    marginLeft: themeHelpers.createSpacing(2),
    fontWeight: themeConfig.typography.body1.fontWeightMedium,
  },
})

export default TextField
