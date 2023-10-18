// app container
import AppContainer from './app.container'

// context provider
import { AppContextProvider, AuthContextProvider, ThemeContextProvider } from '@/contexts'

// react native screens.
import { enableScreens } from 'react-native-screens'

// gesture handler root view.
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// safe area provider
import { SafeAreaProvider } from 'react-native-safe-area-context'

enableScreens(true)

const App = (): JSX.Element => {
  return (
    <AppContextProvider>
      <ThemeContextProvider>
        <AuthContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <AppContainer />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </AuthContextProvider>
      </ThemeContextProvider>
    </AppContextProvider>
  )
}

export default App
