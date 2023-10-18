import { View } from 'react-native'
import { Button, Screen, Typography } from '@/components/core'
import { paletteLibs } from '@/libs/palette/_palette.lib'
import { useTheme } from '@/hooks'
import { useCallback, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/navigators'
import { useAuth } from '@/hooks/auth'
// import { log } from '@/helpers'

const ProfileScreen = (): JSX.Element => {
  const theme = useTheme()
  const nav = useNavigation<NavigationProps>()
  const { auth_setUser, user, auth_resetAuth } = useAuth()
  const [loading, setLoading] = useState(false)

  const onPressSignOut = useCallback(() => {
    auth_resetAuth()
  }, [user])

  console.log('ProfileScreen', user)

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        // log.info('useFocusEffect user', user)
        auth_setUser(user)
        if (loading) {
          setLoading(false)
        }
      })

      return () => unsubscribe()
    }, [])
  )

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      title='Profile'
      titleColor='#ffffff'
      headerBackgroundColor={paletteLibs.grey[800]}
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}
    >
      <View style={{ flex: 1 }}>
        {loading ? (
          <Typography variant='h2'>Loading...</Typography>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 20 }}>
              <Typography color='text.disabled' style={{ textAlign: 'center' }}>
                Profile
              </Typography>
              <Typography color='text.disabled' style={{ textAlign: 'center' }}>
                Name: {user?.displayName}
              </Typography>
              <Typography color='text.disabled' style={{ textAlign: 'center' }}>
                Email: {user?.email}
              </Typography>
            </View>
            <View style={{ width: 140, alignSelf: 'center' }}>
              <Button onPress={onPressSignOut} title='Sign out' color='error' startIcon='exit-outline' iconType='ionicons' />
            </View>
          </View>
        )}
      </View>
    </Screen>
  )
}

export default ProfileScreen
