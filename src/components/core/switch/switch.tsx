import { FC, useMemo } from 'react'
import { View, Insets, Animated, Platform, StyleSheet, I18nManager, TouchableOpacity } from 'react-native'

// hooks
import { useTheme } from '@/hooks'
import { ViewStyle } from 'react-native'

export interface SwitchProps {
  checked: boolean
  size?: 'medium' | 'small' | 'large'
  onChange: (value: boolean) => any
  disabled?: boolean
  hitSlop?: null | Insets | number | undefined
  containerStyle?: ViewStyle
}

const Switch: FC<SwitchProps> = props => {
  const { hitSlop, disabled, onChange, checked, size, containerStyle } = props

  const theme = useTheme()

  const dimensions = useMemo(() => {
    switch (size) {
      case 'small':
        return {
          width: 40,
          padding: 10,
          circleWidth: 15,
          circleHeight: 15,
          translateX: 22,
        }
      case 'large':
        return {
          width: 70,
          padding: 20,
          circleWidth: 30,
          circleHeight: 30,
          translateX: 38,
        }
      // medium
      default:
        return {
          width: 46,
          padding: 12,
          circleWidth: 18,
          circleHeight: 18,
          translateX: 26,
        }
    }
  }, [size])

  const offsetX = new Animated.Value(0)

  let toValue

  if (!I18nManager.isRTL && checked) {
    toValue = dimensions.width - dimensions.translateX
  } else if (I18nManager.isRTL && checked) {
    toValue = -dimensions.width + dimensions.translateX
  } else {
    toValue = -1
  }

  Animated.timing(offsetX, {
    toValue,
    duration: 150,
    useNativeDriver: true,
  }).start()

  return (
    <View style={StyleSheet.flatten([styles.root, containerStyle])}>
      <TouchableOpacity
        style={[
          {
            justifyContent: 'center',
            width: dimensions.width,
            borderRadius: 20,
            padding: dimensions.padding,
            backgroundColor: checked ? theme.palette.primary.main : theme.palette.divider,
            paddingBottom: dimensions.padding,
          },
        ]}
        activeOpacity={0.8}
        hitSlop={hitSlop}
        onPress={() => (disabled ? null : onChange(!checked))}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              margin: Platform.OS === 'web' ? 0 : 4,
              left: Platform.OS === 'web' ? 4 : 0,
              backgroundColor: '#ffffff',
              transform: [{ translateX: offsetX }],
              width: dimensions.circleWidth,
              height: dimensions.circleHeight,
              borderRadius: dimensions.circleWidth / 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2.5,
              elevation: 1.5,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  )
}

Switch.defaultProps = {
  size: 'medium',
  checked: false,
  disabled: false,
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Switch
