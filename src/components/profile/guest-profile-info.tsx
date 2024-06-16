import { useCallback } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

// hooks
import { useNavigation } from '@react-navigation/native'

// components
import { Button, Typography } from '@/components/core'

// assets
import { AssetsAvatars } from '@/assets/avatars'

// interfaces
import { NavigationProps } from '@/navigator'

// helpers / utils
import { createSpacing } from '@/helpers'

const GuestProfileInfo = (): JSX.Element => {
  const nav = useNavigation<NavigationProps>()

  const onPressSignIn = useCallback(() => {
    nav.navigate('login_screen')
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.profileHeader}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={AssetsAvatars.avatarGuest} style={styles.avatar} resizeMode='contain' />
        </TouchableOpacity>
        <Typography color='text.primary' fontWeight='bold' gutterBottom variant='h2' style={{ textAlign: 'center' }}>
          Hi, Guest
        </Typography>
        <Typography color='text.secondary' style={{ textAlign: 'center', marginBottom: createSpacing(4) }}>
          You're not log in
        </Typography>
      </View>
      <View style={{ width: 140, alignSelf: 'center' }}>
        <Button
          rounded
          onPress={onPressSignIn}
          title='Login'
          size='extra-large'
          color='primary'
          startIcon='enter-outline'
          iconType='ionicons'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    height: 132,
    width: 132,
    borderRadius: 132,
    marginBottom: createSpacing(5),
  },
})

export default GuestProfileInfo
