import { themeConfig } from '@/configs'
import { useTheme } from '@/hooks'
import { platformUtils } from '@/utilities'
import { FC, ReactNode } from 'react'
import { View, ColorValue, StyleSheet, ViewProps } from 'react-native'

export interface CardProps {
  elevation?: number
  borderRadius?: number
  showBorder?: boolean
  children: ReactNode
  backgroundColor?: ColorValue
  px?: number
  py?: number
  style?: ViewProps['style']
}

const Card: FC<CardProps> = ({ elevation, borderRadius, showBorder, children, backgroundColor, px, py, style }) => {
  const theme = useTheme()
  return (
    <View
      style={StyleSheet.flatten([
        { ...(platformUtils.isIOS ? styles.cardStyleIos : styles.cardStyle) },
        {
          backgroundColor: backgroundColor ?? theme.palette.background.paper,
          paddingHorizontal: themeConfig.spacing * Number(px),
          paddingVertical: themeConfig.spacing * Number(py),
        },
        { borderRadius: themeConfig.shape.borderRadius * Number(borderRadius) },
        { ...(showBorder && { borderColor: theme.palette.divider }) },
        style,
      ])}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  cardStyleIos: {
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
})

Card.defaultProps = {
  borderRadius: 1,
  showBorder: false,
  px: 4,
  py: 4,
}

export default Card
