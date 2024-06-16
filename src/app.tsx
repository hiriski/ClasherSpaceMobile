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
import { translations } from '@/config/i18n.config'

// toast
import Toast, { ToastConfig } from 'react-native-toast-message'

// navigation container
import { NavigationContainer } from './navigator'

// configs
import { appConfig } from './config'
import { toastConfig } from '@/config'

// store
import { Provider as StoreProvider } from 'react-redux'
import { persistor, store } from './store/store.config'
import { PersistGate } from 'redux-persist/integration/react'

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
