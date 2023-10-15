import { StatusBar } from 'react-native'

// app container
import AppContainer from './app.container'

// app context provider
import { AppContextProvider } from '@/contexts/app'

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar translucent backgroundColor='transparent' />
          <AppContainer />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppContextProvider>
  )
}

export default App
