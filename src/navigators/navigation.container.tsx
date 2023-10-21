import React from 'react'
import { NavigationContainer as ReactNavigationNativeContainer } from '@react-navigation/native'

// root stack navigator
import RootStackNavigator from './root-stack.navigator'

// utils
import { navigationRef } from './navigation.util'

// navigation theme config
import { navigationLightTheme } from './navigation.theme'

// prettier-ignore
interface NavigationContainerProps extends Partial<React.ComponentProps<typeof ReactNavigationNativeContainer>> {}

const NavigationContainer = (props: NavigationContainerProps) => {
  return (
    <ReactNavigationNativeContainer {...props} ref={navigationRef} theme={navigationLightTheme}>
      <RootStackNavigator />
    </ReactNavigationNativeContainer>
  )
}

export default NavigationContainer
