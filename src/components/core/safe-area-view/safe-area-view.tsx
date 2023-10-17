import React, { FC, ReactNode } from 'react'
import { ViewStyle } from 'react-native'

// SafeAreaView
import { SafeAreaView as ReactNativeSafeAreaView } from 'react-native-safe-area-context'

interface SafeAreaViewProps {
  children: ReactNode
  style?: ViewStyle
}

const SafeAreaView: FC<SafeAreaViewProps> = (props): JSX.Element => {
  const { children, style } = props
  return (
    <ReactNativeSafeAreaView
      style={{
        flex: 1,
        ...style,
      }}
    >
      {children}
    </ReactNativeSafeAreaView>
  )
}

export default SafeAreaView
