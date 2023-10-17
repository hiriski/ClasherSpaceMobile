// navigation container
import { NavigationContainer } from '@/navigators'

// hooks
import { useApp, useTheme } from '@/hooks'
import { useNavigationPersistence } from '@/navigators/navigation.hook'
// import { SplashScreen } from './screens/splash'

// toast
import Toast, { ToastConfig } from 'react-native-toast-message'

// config
import { toastConfig } from '@/config'

// components
import { StatusBar } from '@/components/core'
import { uiUtils } from './utilities'
import { log } from './helpers'

const AppContainer = () => {
  // const { splashScreenVisible } = useApp()
  const { palette } = useTheme()
  const { onNavigationStateChange } = useNavigationPersistence()

  // const isNavigationStateRestored = true

  const onNavigationIsReady = (): void => {
    // do something when navigation is ready
    uiUtils.changeNavbarBarColor(palette.background.paper, false)
    log.info('<<< onNavigationIsReady >>')
  }

  return (
    <>
      <StatusBar translucent backgroundColor='transparent' />
      <NavigationContainer
        // initialState={initialNavigationState}
        onStateChange={onNavigationStateChange}
        onReady={onNavigationIsReady}
      />
      <Toast position='bottom' config={toastConfig as ToastConfig} />
      {/* {(splashScreenVisible || !isNavigationStateRestored) && <SplashScreen />} */}
    </>
  )
}

export default AppContainer
