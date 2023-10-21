import { FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '@/hooks'

interface DividerProps {
  style?: ViewStyle
  orientation?: 'horizontal' | 'vertical'
}

const Divider: FC<DividerProps> = (props): JSX.Element => {
  const { orientation, style } = props
  const theme = useTheme()
  return (
    <View
      style={StyleSheet.flatten([
        {
          borderBottomColor: theme.palette.divider,
          ...(orientation === 'horizontal' && {
            borderBottomWidth: StyleSheet.hairlineWidth,
          }),
          ...(orientation === 'vertical' && {
            borderRightWidth: StyleSheet.hairlineWidth,
          }),
          width: '100%',
        },
        { ...style },
      ])}
    />
  )
}

Divider.defaultProps = {
  orientation: 'horizontal',
}

export default Divider
