import { useCallback, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, TextField, Typography } from '@/components/core'

// utils
import { screenUtils } from '@/utilities'
import { createSpacing, log } from '@/helpers'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/navigators'

// hook form
import * as Yup from 'yup'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// hooks
import { useTheme, useToast } from '@/hooks'
import { useAuth } from '@/hooks/auth'

import { IUser } from '@/interfaces'
import { AssetsAvatars } from '@/assets/avatars'

// rn image picker
import { launchImageLibrary } from 'react-native-image-picker'

// fast image
import FastImage from 'react-native-fast-image'

type FormValues = {
  name: string
}

const schema = Yup.object()
  .shape({
    name: Yup.string().required('Please input your name'),
  })
  .required()

const RegisterFormStep2 = (): JSX.Element => {
  const nav = useNavigation<NavigationProps>()
  const { showToast } = useToast()
  const theme = useTheme()

  const [uploadIsLoading, setUploadIsLoading] = useState(false)
  const { auth_setRegisterLoading, registerLoading, auth_setUser, user } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = ({ name }) => {
    auth_setRegisterLoading(true)
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  const handleUpdateUserPhoto = async (photoURL: string): Promise<void> => {}

  const showToastError = useCallback(() => {
    showToast({
      text1: 'Failed to upload profile picture.',
      variant: 'filled',
      position: 'top',
      type: 'error',
    })
  }, [])

  const handleUploadPhoto = async (fileUri: string, fileName: string) => {
    setUploadIsLoading(true)
  }

  const onPressPicture = async (): Promise<void> => {
    if (!uploadIsLoading) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        includeExtra: true,
        selectionLimit: 1,
      })
      if (!result.didCancel && result?.assets?.[0]?.uri) {
        handleUploadPhoto(result.assets?.[0]?.uri, result.assets?.[0]?.fileName as string)
      } else {
        // user cancel picker image
      }
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.formHeader}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressPicture} style={styles.avatarContainer}>
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
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <Image source={AssetsAvatars.avatarGuest} style={styles.avatar} resizeMode='contain' />
            )}
          </View>
        </TouchableOpacity>
        <Typography variant='h6' gutterBottom color='text.secondary'>
          Almost done
        </Typography>
        <Typography variant='h2' gutterBottom fontWeight='bold'>
          How we call you ?
        </Typography>
      </View>
      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='What your name ?'
              labelSize='medium'
              placeholder='Your name...'
              onBlur={onBlur}
              variant='filled'
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='extra-large'
              isError={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message ? errors?.name?.message : undefined}
            />
          )}
        />
      </View>
      <View style={{ marginBottom: createSpacing(4) }}>
        <Button
          isLoading={registerLoading}
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Finish'
          size='extra-large'
          endIcon='arrow-forward'
          iconType='ionicons'
          rounded
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => nav.navigate('profile_screen')} size='extra-large' title='Skip' variant='text' disablePadding />
      </View>
    </View>
  )
}

const AVATAR_SIZE = 60

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: screenUtils.width / 1.2,
    alignSelf: 'center',
    paddingTop: createSpacing(6),
    paddingBottom: createSpacing(3),
  },
  formHeader: {
    marginBottom: createSpacing(4),
    alignItems: 'center',
  },
  logo: {
    height: 52,
    width: 52,
    marginBottom: createSpacing(4),
  },

  avatarContainer: {
    height: AVATAR_SIZE + 6,
    width: AVATAR_SIZE + 6,
    borderRadius: AVATAR_SIZE + 6,
    position: 'relative',
    marginBottom: createSpacing(4),
  },

  avatarImageContainer: {
    height: AVATAR_SIZE + 4,
    width: AVATAR_SIZE + 4,
    borderRadius: AVATAR_SIZE + 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#ffffff',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: AVATAR_SIZE,
  },

  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginBottom: createSpacing(5),
  },
})

export default RegisterFormStep2
