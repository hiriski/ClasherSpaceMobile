import { Pressable, StyleSheet } from 'react-native'

import { GoogleSignin, User as GoogleSignInUser, statusCodes } from '@react-native-google-signin/google-signin'

import GoogleIcon from '@/assets/svg/google.svg'
import { Typography } from '../core'
import { themeConfig } from '@/configs'
import { FC, memo } from 'react'
import { useAuth, useTheme, useToast } from '@/hooks'
import { createSpacing, log } from '@/helpers'
import { useAppDispatch } from '@/store'
import { useNavigation } from '@/navigator'

interface Props {
  text?: string
  onStart: () => void
  onFinish: () => void
}

const GoogleLoginButton: FC<Props> = ({ text, onStart, onFinish }) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  const { auth_googleSignIn } = useAuth()

  const navigation = useNavigation()

  const handlePress = async () => {
    onStart()
    await GoogleSignin.revokeAccess()
      .then()
      .finally(async () => {
        try {
          const responseGoogleAuth: GoogleSignInUser = await GoogleSignin.signIn()

          log.info(`responseGoogleAuth -> ${JSON.stringify(responseGoogleAuth)}`)
          if (responseGoogleAuth?.user?.email) {
            const displayName = responseGoogleAuth.user?.name || responseGoogleAuth.user?.givenName || ''
            dispatch(
              auth_googleSignIn({
                providerAccountId: responseGoogleAuth.user.id,
                providerEmail: responseGoogleAuth.user.email,
                providerAccountName: displayName,
                providerPhotoUrl: responseGoogleAuth.user.photo,
                providerName: 'google',
              })
            )
              .then(result => {
                log.error(`result.payload-> ${JSON.stringify(result.payload)}`)
                if (result.meta.requestStatus === 'fulfilled') {
                  navigation.navigate('profile_screen')
                } else if (result.meta.requestStatus === 'rejected') {
                  let toastTitle = 'Login failed'
                  // @ts-ignore
                  const httpResponse: IUnprocessableEntity = result.payload
                  if (httpResponse.message) {
                    toastTitle = httpResponse.message
                  }
                  showToast({
                    type: 'error',
                    position: 'bottom',
                    variant: 'filled',
                    text1: toastTitle,
                  })
                }
              })
              .catch()
              .finally(() => {
                onFinish()
              })

            // if (response?.access_token) {
            //   // set user token
            //   // authUtils.saveUserAccessToken(response.access_token)
            //   dispatch(auth_setToken(response.access_token))

            //   // reset guest
            //   // authUtils.removeGuestAccessToken()
            //   dispatch(auth_setGuest(null))
            //   dispatch(auth_setGuestToken(null))

            //   // get authenticated user
            //   dispatch(auth_getAuthenticatedUser(response.access_token))
            //     .then(result => {
            //       if (result.meta.requestStatus === 'fulfilled') {
            //         showToast({
            //           text1: 'Login success.',
            //           variant: 'filled',
            //           position: 'top',
            //           type: 'success',
            //         })

            //         // Navigate and reset navigation
            //         navigation.dispatch(
            //           CommonActions.reset({
            //             index: 0,
            //             routes: [{ name: 'bottom_tab_stack' }],
            //           })
            //         )
            //       } else {
            //       }
            //     })
            //     .finally(() => {
            //       _onFinish()
            //     })
            // }
          } else {
            onFinish()
          }
        } catch (e) {
          onFinish()
          if (e?.code !== statusCodes.SIGN_IN_CANCELLED) {
            // const err = e as AxiosError<ICommonResponseError>
            // console.log('err', JSON.stringify(err.response))
            showToast({
              text1: 'Something Went Wrong!',
              variant: 'filled',
              position: 'top',
              type: 'error',
            })
          }
        }
      })
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.root,
          {
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
          },
          {
            ...(pressed && {
              backgroundColor: theme.palette.background.default,
              borderColor: theme.palette.secondary.main,
            }),
          },
        ])
      }
    >
      <GoogleIcon height={24} width={24} />
      <Typography color='text.secondary' style={styles.text}>
        {text}
      </Typography>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: themeConfig.shape.borderRadius * 20,
    borderWidth: 1.5,
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    marginLeft: createSpacing(3),
  },
})

export default memo(GoogleLoginButton)
