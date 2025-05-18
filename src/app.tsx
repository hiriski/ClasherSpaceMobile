import { JSX } from 'react'

import { StatusBar } from 'react-native'

// react native screens.
import { enableScreens } from 'react-native-screens'

// gesture handler root view.
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// safe area provider
import { SafeAreaProvider } from 'react-native-safe-area-context'

// bottom sheet modal provider
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// context provider
import { AuthContextProvider, FeedbackContextProvider, ThemeContextProvider } from '@/contexts'

// i18n
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from '@/configs/i18n.config'

// toast
import Toast, { ToastConfig } from 'react-native-toast-message'

// navigation container
import { NavigationContainer } from './navigator'

// configs
import { appConfig } from './configs'
import { toastConfig } from '@/configs'

// store
import { Provider as StoreProvider } from 'react-redux'
import { persistor, store } from './store/store.config'
import { PersistGate } from 'redux-persist/integration/react'

// react native uni unistyles
import { StyleSheet } from 'react-native-unistyles'

import { GoogleSignin } from '@react-native-google-signin/google-signin'

// theme config
import { theme_breakpoints, themes } from './configs/unistyles-theme.config'

GoogleSignin.configure({ profileImageSize: 512 })

enableScreens(true)

i18n.use(initReactI18next).init({
  resources: translations,
  fallbackLng: appConfig.defaultLang,
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['en', 'id', 'vi'],
  compatibilityJSON: 'v4',
})

// Configure react native unistyles
StyleSheet.configure({
  settings: {
    // adaptiveThemes: true,
    initialTheme: 'light',
  },
  breakpoints: theme_breakpoints,
  themes: themes,
})

const App = (): JSX.Element => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <FeedbackContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <StoreProvider store={store}>
                <PersistGate persistor={persistor}>
                  <BottomSheetModalProvider>
                    <StatusBar translucent backgroundColor='transparent' />
                    <NavigationContainer />
                    <Toast position='bottom' config={toastConfig as ToastConfig} />
                  </BottomSheetModalProvider>
                </PersistGate>
              </StoreProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </FeedbackContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}

export default App
