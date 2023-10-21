import { IThemePalette } from '@/interfaces'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

// prettier-ignore
export type RadioButtonColor = keyof Pick<IThemePalette, 'primary' | 'secondary'>

export interface RadioButtonProps<T> {
  accessibilityLabel?: string
  borderSize?: number
  spacing?: Readonly<number>
  color?: Readonly<RadioButtonColor>
  containerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  label?: string
  labelStyle?: StyleProp<TextStyle>
  direction?: 'row' | 'column'
  onPress?: (value: T) => void
  selected?: boolean
  size?: number
  testID?: string
  value: T
}

export interface RadioGroupProps<T> {
  accessibilityLabel?: string
  color?: RadioButtonColor
  spacing?: number
  containerStyle?: StyleProp<ViewStyle>
  row?: boolean
  onChange?: (val: T) => void
  options: RadioButtonProps<T>[]
  value: T
}
