import React, { useCallback } from 'react'
import { PixelRatio, Pressable, StyleSheet, View } from 'react-native'

// core component
import { Typography } from '@/components/core'

// hooks
import { useTheme } from '@/hooks'

// interfaces
import { RadioButtonProps } from './radio.interface'

// helpers
import { createSpacing } from '@/helpers'

const RadioButton = <T extends unknown>(props: RadioButtonProps<T>) => {
  const {
    value,
    accessibilityLabel,
    borderSize,
    color,
    spacing,
    containerStyle,
    disabled,
    label,
    labelStyle,
    direction,
    onPress,
    selected,
    size,
    testID,
  } = props

  const theme = useTheme()

  const borderWidth = PixelRatio.roundToNearestPixel(borderSize as number)
  const sizeHalf = PixelRatio.roundToNearestPixel((size as number) * 0.5)
  const sizeFull = PixelRatio.roundToNearestPixel(size as number)

  let orientation: any = { flexDirection: 'row' }

  let margin: any = { marginLeft: createSpacing(3) }

  if (direction === 'column') {
    orientation = { alignItems: 'center' }
    margin = { marginTop: createSpacing(3) }
  }

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(value)
    }
  }, [value, onPress])

  return (
    <>
      <Pressable
        accessibilityLabel={label || accessibilityLabel}
        accessibilityRole='radio'
        accessibilityState={{ checked: selected, disabled }}
        disabled={disabled}
        onPress={handlePress}
        style={StyleSheet.flatten([
          styles.root,
          orientation,
          { ...(disabled && { opacity: 0.5 }) },
          // prettier-ignore
          {...(direction === 'row' && {
            marginVertical: createSpacing(spacing as number),
          })},
          // prettier-ignore
          {...(direction === 'column' && {
            marginHorizontal: createSpacing(spacing as number),
          })},
          containerStyle,
        ])}
        testID={testID}
      >
        <View
          style={StyleSheet.flatten([
            styles.border,
            // prettier-ignore
            {...(color === 'primary' && {
              borderColor: theme.palette.primary.main,
            })},
            // prettier-ignore
            {...(color === 'secondary' && {
              borderColor: theme.palette.secondary.main,
            })},
            {
              borderWidth,
              width: sizeFull,
              height: sizeFull,
              borderRadius: sizeHalf,
            },
          ])}
        >
          {selected && (
            <View
              style={StyleSheet.flatten([
                // prettier-ignore
                {...(color === 'primary' && {
                  backgroundColor: theme.palette.primary.main,
                })},
                // prettier-ignore
                {...(color === 'secondary' && {
                  backgroundColor: theme.palette.secondary.main,
                })},
                {
                  width: sizeHalf,
                  height: sizeHalf,
                  borderRadius: sizeHalf,
                },
              ])}
            />
          )}
        </View>
        {Boolean(label) && (
          <Typography fontWeight='500' style={StyleSheet.flatten([margin, styles.label, labelStyle])}>
            {label}
          </Typography>
        )}
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  border: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    lineHeight: 17,
  },
})

RadioButton.defaultProps = {
  accessibilityLabel: 'radio button',
  borderSize: 2,
  color: 'primary',
  direction: 'row',
  selected: false,
  disabled: false,
  size: 22,
}

export default RadioButton
