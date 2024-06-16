import { useCallback, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'

// hooks
import { useToast } from '@/hooks'

// components
import { Button, IconButton, Typography } from '@/components/core'

// assets
import { AssetsAvatars } from '@/assets/avatars'

// interfaces
import { IUser } from '@/interfaces'

// helpers / utils
import { createSpacing, log } from '@/helpers'
import { useAuth } from '@/hooks/auth'

// rn image picker
import { launchImageLibrary } from 'react-native-image-picker'

// firebase
// import auth from '@react-native-firebase/auth'
// import storage from '@react-native-firebase/storage'

// fast image
import FastImage from 'react-native-fast-image'

const AVATAR_SIZE = 132

const UserProfileInfo = (): JSX.Element => {
  const [uploadIsLoading, setUploadIsLoading] = useState(false)

  const { showToast } = useToast()

  const { user, auth_setOpenBottomSheetConfirmLogout, auth_setUser } = useAuth()

  const onPressLogout = useCallback(() => {
    auth_setOpenBottomSheetConfirmLogout(true)
  }, [])

  const handleUpdateUserPhoto = async (photoURL: string | null): Promise<void> => {
    auth()
      .currentUser?.updateProfile({
        photoURL,
      })
      .then(() => {
        setUploadIsLoading(false)
        showToast({
          text1: 'Your profile picture updated successfully.',
          variant: 'filled',
          position: 'bottom',
        })
        auth().onAuthStateChanged(user => {
          if (user) {
            auth_setUser(user as IUser)
          }
        })
      })
      .catch(error => {
        setUploadIsLoading(false)
        log.error(`error-> ${error}`)
      })
  }

  const handleUploadPhoto = async (fileUri: string, fileName: string) => {
    setUploadIsLoading(true)
    const imageRef = storage().ref(`users/photos/${user?.uid}/${fileName}`)
    await imageRef.putFile(fileUri, { contentType: 'image/jpg' }).catch(error => {
      throw error
    })
    const url = await imageRef.getDownloadURL().catch(error => {
      throw error
    })

    if (url) {
      handleUpdateUserPhoto(url)
    } else {
      setUploadIsLoading(false)
      showToast({
        text1: 'Failed to upload profile picture.',
        variant: 'filled',
        position: 'bottom',
        type: 'error',
      })
    }
  }

  const onPressPicture = async (): Promise<void> => {
    if (!uploadIsLoading) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        includeExtra: true,
        presentationStyle: 'overFullScreen',
        selectionLimit: 1,
      })
      if (!result.didCancel && result?.assets?.[0]?.uri) {
        handleUploadPhoto(result.assets?.[0]?.uri, result.assets?.[0]?.fileName as string)
      } else {
        // user cancel picker image
      }
    }
  }

  const onPressRemoveProfilePhoto = (): void => {
    handleUpdateUserPhoto(null)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.profileHeader}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressPicture} style={styles.avatarContainer}>
          {user?.photoURL && (
            <IconButton
              variant='contained'
              color='error'
              icon='trash'
              iconSize={20}
              iconType='ionicons'
              style={styles.removeAvatarBtn}
              onPress={onPressRemoveProfilePhoto}
            />
          )}
          {uploadIsLoading && (
            <View style={styles.loadingUpload}>
              <ActivityIndicator size={24} />
            </View>
          )}
          <View style={styles.avatarImageContainer}>
            {user?.photoURL ? (
              <FastImage
                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                defaultSource={AssetsAvatars.avatarGuest}
                source={{
                  uri: user?.photoURL as string,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <Image source={AssetsAvatars.avatarGuest} style={styles.avatar} resizeMode='contain' />
            )}
          </View>
        </TouchableOpacity>
        <Typography color='text.secondary' gutterBottom style={{ textAlign: 'center' }}>
          Hi,
        </Typography>
        <Typography color='text.primary' fontWeight='bold' gutterBottom={3} variant='h3' style={{ textAlign: 'center' }}>
          {user?.displayName ?? user?.email}
        </Typography>
      </View>
      <View style={{ width: 140, alignSelf: 'center' }}>
        <Button
          rounded
          onPress={onPressLogout}
          title='Log out'
          size='large'
          color='error'
          variant='text'
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
  avatarContainer: {
    height: AVATAR_SIZE + 6,
    width: AVATAR_SIZE + 6,
    borderRadius: AVATAR_SIZE + 6,
    position: 'relative',
    marginBottom: createSpacing(3),
  },
  avatarImageContainer: {
    height: AVATAR_SIZE + 6,
    width: AVATAR_SIZE + 6,
    borderRadius: AVATAR_SIZE + 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
    borderWidth: 3,
    borderColor: '#ffffff',
  },

  removeAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  loadingUpload: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: AVATAR_SIZE,
  },
  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginBottom: createSpacing(5),
  },
})

export default UserProfileInfo
