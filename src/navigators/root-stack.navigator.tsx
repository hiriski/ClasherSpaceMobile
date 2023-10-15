import { useEffect, useRef, useState } from 'react'

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// interfaces
import { NavigatorParamList, ScreenType } from './navigation.type'
import { AppState, AppStateStatus } from 'react-native'

// screens
import { SplashScreen } from '@/screens/splash'
import { DashboardScreen } from '@/screens/dashboard'

// utils
import { storageUtils } from '@/utils'

const SCREENS: Array<ScreenType> = [
  { name: 'splash_screen', component: SplashScreen },
  { name: 'dashboard_screen', component: DashboardScreen },
]

const RootStack = createNativeStackNavigator<NavigatorParamList>()

const RootStackNavigator = (): JSX.Element | null => {
  const appState = useRef<AppStateStatus>(AppState.currentState)
  const [isAppLoaded, setIsAppLoaded] = useState(false)
  const [isAlreadyLaunched, setIsAlreadyLaunched] = useState(false)
  const [_, setAppStateVisible] = useState(appState.current)

  const init = async (): Promise<void> => {
    console.log('----- INIT DO SOMETHING -----')
  }

  const checkAlreadyLaunched = async (): Promise<void> => {
    const value = await storageUtils.get('IS_ALREADY_LAUNCHED')
    if (value) {
      setIsAlreadyLaunched(Boolean(value) ?? false)
    } else {
      setIsAlreadyLaunched(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      checkAlreadyLaunched().then(() => {
        setIsAppLoaded(true)
      })
    })()

    init()
    // ! check appstate, and run function in case user change permmission
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        // appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // checkLocPermissionState()
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })
    return () => {
      subscription.remove()
    }
  }, [])

  if (!isAppLoaded) {
    return null
  }

  return (
    <RootStack.Navigator
      initialRouteName='dashboard_screen'
      screenOptions={{
        headerShown: false,
      }}
    >
      {SCREENS.map(x => {
        return <RootStack.Screen key={x.name} component={x.component} name={x.name} options={x.options} />
      })}
    </RootStack.Navigator>
  )
}

export default RootStackNavigator
