import { useCallback, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker, PickerProps } from '@react-native-picker/picker'
import { IDropdown } from '@/interfaces'
import {
  TEXT_FIELD_EXTRA_LARGE_HEIGHT,
  TEXT_FIELD_LARGE_HEIGHT,
  TEXT_FIELD_MEDIUM_HEIGHT,
  TEXT_FIELD_SMALL_HEIGHT,
  TextFieldProps,
} from '../text-field/text-field'
import { themeHelpers } from '@/helpers'
import { themeConfig } from '@/config'
import { Typography } from '../typography'
import { useTheme } from '@/hooks'
import { grey, red } from '@/libs'

interface SelectProps<T> extends Omit<PickerProps<T>, 'selectedValue' | 'onValueChange'> {
  value: T
  onChange: (val: T, index: number) => void
  options: Array<IDropdown<T>>
  size?: TextFieldProps['size']
  variant?: TextFieldProps['variant']
  label?: TextFieldProps['label']
  labelSize?: TextFieldProps['labelSize']
  labelStyle?: TextFieldProps['labelStyle']
  rounded?: TextFieldProps['rounded']
  isError?: TextFieldProps['isError']
  helperText?: TextFieldProps['helperText']
  isValid?: TextFieldProps['isValid']
  margin?: TextFieldProps['margin']
  style?: TextFieldProps['style']
  disabled?: boolean
}

const Select = <T extends unknown>(props: SelectProps<T>) => {
  const {
    value,
    onChange,
    options,
    size,
    variant,
    label,
    labelSize,
    labelStyle,
    rounded,
    disabled,
    isError,
    helperText,
    isValid,
    margin,
    style,
  } = props
  const theme = useTheme()

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
        styles.root, // prettier-ignore
        { ...(margin === 'none' && { marginBottom: 0 }) },
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
              color: theme.palette.text.secondary,
              ...labelStyle,
            },
          ])}
        >
          {label}
        </Typography>
      )}
      <View
        style={StyleSheet.flatten([
          styles.container,

          // rounded
          // prettier-ignore
          { ...(rounded && size === 'small' && { borderRadius: TEXT_FIELD_SMALL_HEIGHT }) },
          // prettier-ignore
          { ...(rounded && size === 'medium' && { borderRadius: TEXT_FIELD_MEDIUM_HEIGHT }) },
          // prettier-ignore
          { ...(rounded && size === 'large' && { borderRadius: TEXT_FIELD_LARGE_HEIGHT }) },
          // prettier-ignore
          { ...(rounded && size === 'extra-large' && { borderRadius: TEXT_FIELD_EXTRA_LARGE_HEIGHT }) },

          // styles for variant outlined
          // prettier-ignore
          {
            ...(variant === 'outlined' && disabled && {
              backgroundColor: theme.palette.background.default,
              borderColor: theme.palette.divider,
            }),
          },

          // Styles for variant outlined disabled.
          // prettier-ignore
          { ...(variant === 'outlined' && !disabled && {
            backgroundColor: theme.palette.background.paper,
            borderColor: !theme.isDarkMode ? grey[200] : grey[900],
            color: theme.palette.text.disabled,
          })},

          // Styles for variant outlined focused.
          // prettier-ignore
          {...(isFocused && variant === 'outlined' && { borderColor: theme.palette.primary.main })},

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
            borderColor: theme.palette.success.main,
            color: theme.palette.success.dark,
          })},

          // Styles for variant filled
          // prettier-ignore
          {...(variant === 'filled' && {
            backgroundColor: !theme.isDarkMode ? '#efefef' : grey[900],
            borderColor: !theme.isDarkMode ? '#efefef' : grey[900], 
          })},

          // Styles for variant filled disabled.
          // prettier-ignore
          {...(variant === 'filled' && !disabled && {
            backgroundColor: !theme.isDarkMode ? grey[200] : grey[800],
            borderColor: !theme.isDarkMode ? grey[200] : grey[800],
            color: theme.palette.text.disabled,
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
            backgroundColor: theme.palette.success.light,
            borderColor: theme.palette.success.main,
            color: theme.palette.success.dark,
          })},

          { ...style },
        ])}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          dropdownIconColor={theme.palette.text.secondary}
          style={StyleSheet.flatten([
            styles.overridePickerStyle,
            { ...(size === 'small' && styles.picker_small) },
            { ...(size === 'medium' && styles.picker_medium) },
            { ...(size === 'large' && styles.picker_large) },
            { ...(size === 'extra-large' && styles.picker_extraLarge) },
          ])}
          {...props}
        >
          {options.length > 0 &&
            options.map((x, index) => (
              <Picker.Item
                enabled={x.value !== null || x.value !== undefined}
                style={StyleSheet.flatten([
                  {
                    fontFamily: themeConfig.typography.body1.fontFamily,
                  },
                  { ...(size === 'small' && styles.pickerItem_small) },
                  { ...(size === 'medium' && styles.pickerItem_medium) },
                  { ...(size === 'large' && styles.pickerItem_large) },
                  { ...(size === 'extra-large' && styles.pickerItem_extraLarge) },
                ])}
                key={(String(x.value) + index) as string}
                label={x.label}
                value={x.value}
              />
            ))}
        </Picker>
      </View>
      {/* --- Helper text --- */}
      {helperText && (
        <Typography
          style={StyleSheet.flatten([
            styles.helperText,
            {
              color: isError ? red[500] : theme.palette.text.secondary,
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

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  container: {
    borderWidth: 1.3,
    borderRadius: themeConfig.shape.borderRadius,
  },
  overridePickerStyle: {
    backgroundColor: 'transparent',
  },
  picker_small: {
    height: TEXT_FIELD_SMALL_HEIGHT,
    transform: [{ translateY: -6 }],
  },
  picker_medium: {
    height: TEXT_FIELD_MEDIUM_HEIGHT,
    transform: [{ translateY: -4 }],
  },
  picker_large: {
    height: TEXT_FIELD_LARGE_HEIGHT,
    transform: [{ translateY: -2 }],
  },
  picker_extraLarge: {
    height: TEXT_FIELD_EXTRA_LARGE_HEIGHT,
  },

  pickerItem_small: {
    fontSize: 13,
    lineHeight: 16.4,
  },
  pickerItem_medium: {
    fontSize: 13.8,
    lineHeight: 17.4,
  },
  pickerItem_large: {
    fontSize: 15.6,
    lineHeight: 18.4,
  },
  pickerItem_extraLarge: {
    fontSize: 16,
    lineHeight: 19.2,
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

Select.defaultProps = {
  options: [],
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

export default Select
