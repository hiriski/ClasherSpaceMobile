import { useEffect, useRef, useState } from 'react'

// navigation config
import navigatorConfig, { NavigationConfig } from './navigation.config'

// interfaces
import { NavigatorParamList } from './navigation.type'
import { NavigationContainerProps, NavigationState } from '@react-navigation/native'

// hooks
import { useApp } from '@/hooks'
import { useIsMounted } from '@/hooks'

// utils
import { storageUtils } from '@/utilities'
import { getActiveRouteName } from './navigation.util'

/**
 * This helper function will determine whether we should enable navigation persistence
 * based on a config setting and the __DEV__ environment (dev or prod).
 */
function navigationRestoredDefaultState(persistNavigation: NavigationConfig['persistNavigation']) {
  if (persistNavigation === 'always') {
    return false
  }
  if (persistNavigation === 'dev' && __DEV__) {
    return false
  }
  if (persistNavigation === 'prod' && !__DEV__) {
    return false
  }

  // all other cases, disable restoration by returning true
  return true
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence() {
  const { splashScreenVisible, setSplashScreen } = useApp()

  const isMounted = useIsMounted()

  // prettier-ignore
  const [initialNavigationState, setInitialNavigationState] = useState<NavigationContainerProps['initialState']>()

  const initNavState = navigationRestoredDefaultState(navigatorConfig.persistNavigation)
  const [isRestored, setIsRestored] = useState(initNavState)
  const routeNameRef = useRef<keyof NavigatorParamList | undefined>()

  const onNavigationStateChange = (state: NavigationState | undefined) => {
    // console.log('onNavigationStateChange state ->', state)
    const previousRouteName = routeNameRef.current
    const currentRouteName = getActiveRouteName(state)

    if (previousRouteName !== currentRouteName) {
      // track screens.
      // if (__DEV__) {
      //   console.log('>>>> currentRouteName >>>> ', currentRouteName)
      // }
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName

    // Persist state to storage
    storageUtils.save('NAVIGATION_STATE', state)
  }

  const restoreState = async () => {
    try {
      const state = await storageUtils.get('NAVIGATION_STATE')
      if (state) {
        setInitialNavigationState(state)
      }
    } finally {
      setIsRestored(true)
    }
  }

  useEffect(() => {
    setSplashScreen(true)
    setInitialNavigationState({
      index: 0,
      routes: [{ name: 'splash_screen' }],
    })
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (!isRestored) {
        // console.log('!isRestored')
        await restoreState()
      }
      if (splashScreenVisible) {
        setTimeout(() => {
          setSplashScreen(false)
        }, 2000)
      }
    })()
  }, [isRestored])

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  }
}
