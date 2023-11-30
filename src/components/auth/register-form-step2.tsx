import { FC, useCallback, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, TextField, Typography } from '@/components/core'

// utils
import { authUtils, screenUtils } from '@/utilities'
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

import { AssetsAvatars } from '@/assets/avatars'

// rn image picker
import { launchImageLibrary } from 'react-native-image-picker'

// firebase
// import storage from '@react-native-firebase/storage'

// fast image
import FastImage from 'react-native-fast-image'
import { AuthApi, IRequestRegister } from '@/api'
import { appConfig } from '@/config'

type FormValues = {
  password: string
  password_confirmation: string
  photoUrl: string | null
}

const schema = Yup.object()
  .shape({
    password: Yup.string().required('Please input your password'),
    password_confirmation: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  .required()

interface Props {
  values: IRequestRegister
}

const RegisterFormStep2: FC<Props> = ({ values }): JSX.Element => {
  const nav = useNavigation<NavigationProps>()
  const { showToast } = useToast()
  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [uploadIsLoading, setUploadIsLoading] = useState(false)

  const { auth_setUser, user } = useAuth()

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      password_confirmation: '',
      photoUrl: null,
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = async (valuesStep2): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await AuthApi.registerWithEmailAndPassword({ ...values, ...valuesStep2 })
      setIsLoading(false)
      if (response.token) {
        authUtils.saveToken(response.token)
        auth_setUser(response.user)
        nav.replace('bottom_tab_stack')
        reset()
        showToast({
          text1: 'Register Success',
          variant: 'filled',
          position: 'top',
          type: 'success',
        })
      }
    } catch (e) {
      setIsLoading(false)
      showToast({
        text1: 'Opss.. register failed',
        variant: 'filled',
        position: 'top',
        type: 'error',
      })
    }
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

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
    const imageRef = storage().ref(`users/photos/${fileName}`)
    await imageRef.putFile(fileUri, { contentType: 'image/jpg' }).catch(error => {
      setUploadIsLoading(false)
      showToastError()
    })
    const url = await imageRef.getDownloadURL().catch(error => {
      throw error
    })
    if (url) {
      setValue('photoUrl', url)
    } else {
      setUploadIsLoading(false)
      showToastError()
    }
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
            {user?.photoUrl ? (
              <FastImage
                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                defaultSource={AssetsAvatars.avatarGuest}
                source={{
                  uri: user?.photoUrl as string,
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
          Create your password
        </Typography>
      </View>

      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='Password'
              labelSize='medium'
              placeholder='Password'
              variant='filled'
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='large'
              isError={Boolean(errors?.password?.message)}
              helperText={errors?.password?.message ? errors?.password?.message : undefined}
            />
          )}
        />
        <Controller
          control={control}
          name='password_confirmation'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='Confirm Password'
              labelSize='medium'
              placeholder='Confirm Password'
              variant='filled'
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='large'
              isError={Boolean(errors?.password_confirmation?.message)}
              helperText={errors?.password_confirmation?.message ? errors?.password_confirmation?.message : undefined}
            />
          )}
        />
      </View>
      <View style={{ marginBottom: createSpacing(4) }}>
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Create Account'
          size='extra-large'
          endIcon='arrow-forward'
          iconType='ionicons'
          rounded
        />
      </View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => nav.navigate('profile_screen')} size='extra-large' title='Skip' variant='text' disablePadding />
      </View> */}
      <View style={{ marginTop: 'auto', alignItems: 'center' }}>
        <Typography color='text.secondary' variant='subtitle2'>
          By sign up, you agree to {appConfig.appName}{' '}
        </Typography>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
          <Typography color='text.primary' variant='subtitle2'>
            Term of Conditions{' '}
          </Typography>
          <Typography color='text.secondary' variant='subtitle2'>
            and{' '}
          </Typography>
          <Typography color='text.primary' variant='subtitle2'>
            Privacy Policy
          </Typography>
        </View>
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
