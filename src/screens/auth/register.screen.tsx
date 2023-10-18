import { View } from 'react-native'
import { Screen } from '@/components/core'
import { paletteLibs } from '@/libs/palette/_palette.lib'
import { useTheme } from '@/hooks'
import { RegisterForm } from '@/components/auth'
import { useAuth } from '@/hooks/auth'
import { BottomSheetAlreadyLogin } from '@/components/auth'

const RegisterScreen = (): JSX.Element => {
  const theme = useTheme()

  const { isAuthenticated } = useAuth()

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      title='Register'
      titleColor='#ffffff'
      headerBackgroundColor={paletteLibs.grey[800]}
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}
    >
      <View style={{ flex: 1 }}>
        <RegisterForm />
      </View>

      {/* bottom sheet already login */}
      {isAuthenticated && <BottomSheetAlreadyLogin />}
    </Screen>
  )
}

export default RegisterScreen
