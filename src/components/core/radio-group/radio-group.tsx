import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

// interfaces
import { RadioGroupProps } from './radio.interface'

// components
import RadioButton from './radio-button'
import { useTheme } from '@/hooks'

const RadioGroup = <T extends unknown>(props: RadioGroupProps<T>) => {
  const theme = useTheme()
  const { accessibilityLabel, containerStyle, color, spacing, row, onChange, options, value } = props

  const onSelect = useCallback(
    (newValue: T) => {
      if (newValue !== value && typeof onChange === 'function') {
        onChange(newValue)
      }
    },
    [value, onChange]
  )

  return (
    <View accessibilityLabel={accessibilityLabel} accessibilityRole='radiogroup' style={[styles.root, containerStyle]}>
      {options.map((option, index) => (
        <RadioButton
          {...option}
          key={String(index)}
          selected={option.value === value}
          color={color}
          spacing={spacing}
          onPress={() => onSelect(option.value)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
})

RadioGroup.defaultProps = {
  row: false,
  accessibilityLabel: 'radio group',
  color: 'primary',
  spacing: 1.8,
}

export default RadioGroup
