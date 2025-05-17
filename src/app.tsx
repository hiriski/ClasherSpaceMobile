// app container
import AppContainer from './app.container'

// context provider
import { AppContextProvider, AuthContextProvider, FeedbackContextProvider, ThemeContextProvider } from '@/contexts'

// react native screens.
import { enableScreens } from 'react-native-screens'

// gesture handler root view.
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// safe area provider
import { SafeAreaProvider } from 'react-native-safe-area-context'

// bottom sheet modal provider
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// i18n
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from '@/config/i18n.config'
import { appConfig } from './config'
import { StatusBar } from 'react-native'

// toast
import Toast, { ToastConfig } from 'react-native-toast-message'

// config
import { toastConfig } from '@/config'
import { NavigationContainer } from './navigators'

// store
import { Provider as StoreProvider } from 'react-redux'
import { persistor, store } from './store/store.config'
import { PersistGate } from 'redux-persist/integration/react'
import { JSX } from 'react'

enableScreens(true)

i18n.use(initReactI18next).init({
  resources: translations,
  fallbackLng: appConfig.defaultLang,
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['en', 'id', 'vi'],
  compatibilityJSON: 'v3',
})

const App = (): JSX.Element => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <FeedbackContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <StoreProvider store={store}>
                  <PersistGate persistor={persistor}>
                    <StatusBar translucent backgroundColor='transparent' />
                    <NavigationContainer />
                    <Toast position='bottom' config={toastConfig as ToastConfig} />
                  </PersistGate>
                </StoreProvider>
              </SafeAreaProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </FeedbackContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}

export default App
