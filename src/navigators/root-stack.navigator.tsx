import { useEffect, useRef, useState } from 'react'

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// interfaces
import { NavigatorParamList, ScreenType } from './navigation.type'
import { AppState, AppStateStatus } from 'react-native'
import { AppLanguageCode } from '@/interfaces'

// screens & navigator
import { SplashScreen } from '@/screens/splash'

// navigator
import BottomTabStackNavigator from './bottom-tab-stack.navigator'

// screens
import { LayoutDetailScreen } from '@/screens/layout'
import { LoginScreen, RegisterScreen } from '@/screens/auth'
import { OnboardingScreen } from '@/screens/onboarding'

// hooks
import { useApp, useFeedback } from '@/hooks'
import { useTranslation } from 'react-i18next'

// helpers / utils
import { authUtils, storageUtils } from '@/utilities'
import { useAuth } from '@/hooks/auth'
import { Splash } from '@/components/splash'
import { log } from '@/helpers'
import { AuthApi } from '@/api'
import { AxiosError } from 'axios'

const SCREENS: Array<ScreenType> = [
  { name: 'splash_screen', component: SplashScreen },
  { name: 'onboarding_screen', component: OnboardingScreen },
  { name: 'bottom_tab_stack', component: BottomTabStackNavigator },
  { name: 'layout_detail_screen', component: LayoutDetailScreen },
  { name: 'register_screen', component: RegisterScreen },
  { name: 'login_screen', component: LoginScreen },
]

const RootStack = createNativeStackNavigator<NavigatorParamList>()

const RootStackNavigator = (): JSX.Element | null => {
  const appState = useRef<AppStateStatus>(AppState.currentState)
  const [isAppLoaded, setIsAppLoaded] = useState(false)
  const [_, setAppStateVisible] = useState(appState.current)

  const { i18n } = useTranslation()
  const { app_setLang, app_isAlreadyLaunched, app_setIsAlreadyLaunched } = useApp()
  const { feedback_setHasSubmittedFeedback } = useFeedback()
  const { auth_setUser, auth_resetAuth } = useAuth()

  /**
   * check has submitted feedback
   */
  const checkHasSubmittedFeedback = async (): Promise<void> => {
    const hasSubmitted = await storageUtils.get('SUBMITTED_FEEDBACK')
    feedback_setHasSubmittedFeedback(hasSubmitted ?? false)
  }

  /**
   * check already launched
   */
  const checkIsAlreadyLaunched = async (): Promise<void> => {
    const value = await storageUtils.get('IS_ALREADY_LAUNCHED')
    app_setIsAlreadyLaunched(Boolean(value) ?? false)
  }

  /**
   * check app language
   */
  const checkAppLanguage = async (): Promise<void> => {
    const savedLanguageCode = storageUtils.getString('LANGUAGE')
    if (savedLanguageCode && i18n.language !== savedLanguageCode) {
      app_setLang(savedLanguageCode as AppLanguageCode)
    }
  }

  /**
   * check authenticated user
   */
  const checkAuthenticatedUser = async (): Promise<void> => {
    const sanctumToken = authUtils.getToken()
    auth_setUser(null)
    try {
      if (sanctumToken) {
        const response = await AuthApi.getAuthenticatedUser(sanctumToken as string)
        if (response?.id) {
          auth_setUser(response)
        }
      }
    } catch (e) {
      const error: AxiosError<unknown> = e as AxiosError<unknown>
      if (error?.response?.status === 401) {
        auth_resetAuth()
      }
    }
  }

  const initApp = async (): Promise<void> => {
    await checkAppLanguage()
    await checkIsAlreadyLaunched()
    await checkAuthenticatedUser()
  }

  useEffect(() => {
    ;(async () => {
      initApp()
        .then(result => {
          log.info(`initApp result  -> ${JSON.stringify(result)}`)
        })
        .catch(e => {
          log.info(`initApp error  -> ${JSON.stringify(e)}`)
        })
        .finally(() => {
          log.info('initApp finally ->')
          setIsAppLoaded(true)
        })
    })()

    // other functions that need to run first time
    checkHasSubmittedFeedback()

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
    return <Splash />
  }

  return (
    <RootStack.Navigator
      initialRouteName={app_isAlreadyLaunched ? 'bottom_tab_stack' : 'onboarding_screen'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {SCREENS.map(x => {
        return <RootStack.Screen key={x.name} component={x.component} name={x.name} options={x.options} />
      })}
    </RootStack.Navigator>
  )
}

export default RootStackNavigator
