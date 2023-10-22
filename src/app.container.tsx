// navigation container
import { NavigationContainer } from '@/navigators'

// hooks
import { useTheme } from '@/hooks'

// toast
import Toast, { ToastConfig } from 'react-native-toast-message'

// config
import { toastConfig } from '@/config'

// components
import { StatusBar } from '@/components/core'
import { uiUtils } from './utilities'
import { log } from './helpers'

const AppContainer = () => {
  const { palette } = useTheme()

  const onNavigationIsReady = (): void => {
    log.info('<<< onNavigationIsReady >>')
    // do something when navigation is ready
    uiUtils.changeNavbarBarColor(palette.background.paper, false, false)
  }

  return (
    <>
      <StatusBar translucent backgroundColor='transparent' />
      <NavigationContainer onReady={onNavigationIsReady} />
      <Toast position='bottom' config={toastConfig as ToastConfig} />
      {/* {(splashScreenVisible || !isNavigationStateRestored) && <SplashScreen />} */}
    </>
  )
}

export default AppContainer
