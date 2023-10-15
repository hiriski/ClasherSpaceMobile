import React from 'react'
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native'

// root stack navigator
import RootStackNavigator from './root-stack.navigator'

// utils
import { navigationRef } from './navigation.util'

// navigation theme config
import { navigationLightTheme } from './navigation.theme'

// prettier-ignore
interface NavigationContainerProps extends Partial<React.ComponentProps<typeof ReactNavigationContainer>> {}

const NavigationContainer = (props: NavigationContainerProps) => {
  return (
    <ReactNavigationContainer {...props} ref={navigationRef} theme={navigationLightTheme}>
      <RootStackNavigator />
    </ReactNavigationContainer>
  )
}

export default NavigationContainer
