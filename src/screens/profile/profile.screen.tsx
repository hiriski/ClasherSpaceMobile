import { useCallback, useState } from 'react'

// hooks
import { useAuth } from '@/hooks/auth'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from '@/hooks'

// firebase
// import auth from '@react-native-firebase/auth'

// components
import { Screen } from '@/components/core'
import { UserProfileInfo, GuestProfileInfo } from '@/components/profile'
import { BottomSheetConfirmLogout } from '@/components/auth'

const ProfileScreen = (): JSX.Element => {
  const theme = useTheme()
  const { auth_setUser, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)

  console.log('isAuthenticated', isAuthenticated)

  useFocusEffect(
    useCallback(() => {
      // const unsubscribe = auth().onAuthStateChanged(user => {
      //   auth_setUser(user ?? null)
      //   if (loading) {
      //     setLoading(false)
      //   }
      // })
      // return () => unsubscribe()
    }, [])
  )

  return (
    <>
      <Screen
        preset='fixed'
        statusBarStyle='dark-content'
        title='Profile'
        titleSize='small'
        backgroundColor={theme.palette.background.default}
        headerBackgroundColor={theme.palette.background.default}
        style={{ paddingHorizontal: theme.horizontalSpacing }}
      >
        {isAuthenticated ? <UserProfileInfo /> : <GuestProfileInfo />}
      </Screen>
      <BottomSheetConfirmLogout />
    </>
  )
}

export default ProfileScreen
