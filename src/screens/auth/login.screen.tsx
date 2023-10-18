import { View } from 'react-native'
import { Screen } from '@/components/core'
import { paletteLibs } from '@/libs/palette/_palette.lib'
import { useTheme } from '@/hooks'
import { LoginForm } from '@/components/auth'
import BottomSheetAlreadyLogin from '@/components/auth/bottom-sheet-already-login'
import { useAuth } from '@/hooks/auth'
import { log } from '@/helpers'

const LoginScreen = (): JSX.Element => {
  const theme = useTheme()
  return (
    <>
      <Screen
        preset='fixed'
        statusBarStyle='light-content'
        title='Login'
        titleColor='#ffffff'
        headerBackgroundColor={paletteLibs.grey[800]}
        backgroundColor={theme.palette.background.paper}
        style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}
      >
        <View style={{ flex: 1 }}>
          <LoginForm />
        </View>
      </Screen>
    </>
  )
}

export default LoginScreen
