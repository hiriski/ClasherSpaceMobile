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

// i18n
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from '@/config/i18n.config'
import { appConfig } from './config'

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
    <AppContextProvider>
      <ThemeContextProvider>
        <AuthContextProvider>
          <FeedbackContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <AppContainer />
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </FeedbackContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </AppContextProvider>
  )
}

export default App
