// navigation container
import { NavigationContainer } from '@/navigators'

// hooks
import { useApp } from '@/hooks'
import { useNavigationPersistence } from '@/navigators/navigation.hook'
import { SplashScreen } from './screens/splash'

const AppContainer = () => {
  const { splashScreenVisible } = useApp()
  const { initialNavigationState, isRestored: isNavigationStateRestored, onNavigationStateChange } = useNavigationPersistence()

  const onNavigationIsReady = (): void => {
    // do something when navigation is ready
  }

  return (
    <>
      {(splashScreenVisible || !isNavigationStateRestored) && <SplashScreen />}
      <NavigationContainer
        initialState={initialNavigationState}
        onStateChange={onNavigationStateChange}
        onReady={onNavigationIsReady}
      />
    </>
  )
}

export default AppContainer
