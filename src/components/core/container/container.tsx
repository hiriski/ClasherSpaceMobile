import React, { FC, ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'

// utils
import { createSpacing } from '@/helpers'
import { themeConfig } from '@/config'

export interface ContainerProps {
  children: ReactNode
  style?: ViewStyle
  spacingHorizontal?: number
  spacingVertical?: number
}

const Container: FC<ContainerProps> = (props): JSX.Element => {
  const { children, spacingHorizontal, spacingVertical, style } = props
  return (
    <View
      style={{
        paddingHorizontal: createSpacing(Number(spacingHorizontal)),
        paddingVertical: createSpacing(Number(spacingVertical)),
        ...style,
      }}
    >
      {children}
    </View>
  )
}

Container.defaultProps = {
  spacingHorizontal: themeConfig.horizontalSpacing,
  spacingVertical: 0,
}

export default Container
