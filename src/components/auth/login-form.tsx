import { Image, StyleSheet, View } from 'react-native'
import { Button, TextField, Typography } from '@/components/core'
import auth from '@react-native-firebase/auth'

// utils
import { screenUtils } from '@/utilities'
import { createSpacing, log } from '@/helpers'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/navigators'

// hook form
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useTheme, useToast } from '@/hooks'
import { useAuth } from '@/hooks/auth'
import { Assets } from '@/assets'

type FormValues = {
  email: string
  password: string
}

const schema = Yup.object()
  .shape({
    email: Yup.string().email('Please input a valid email').required('Please input your email'),
    password: Yup.string().required('Please input your password'),
  })
  .required()

const LoginForm = (): JSX.Element => {
  const nav = useNavigation<NavigationProps>()
  const theme = useTheme()

  const { showToast } = useToast()

  const { auth_setLoginLoading, loginLoading } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = values => {
    auth_setLoginLoading(true)
    const { email, password } = values
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth_setLoginLoading(false)
        nav.navigate('profile_screen')
        showToast({
          type: 'success',
          position: 'bottom',
          variant: 'filled',
          text1: 'Login Success',
        })
      })
      .catch(error => {
        auth_setLoginLoading(false)
        let toastTitle: string | null = null
        if (error?.code === 'auth/invalid-login') {
          toastTitle = 'Email or password invalid!'
        }
        if (toastTitle) {
          showToast({
            type: 'error',
            position: 'bottom',
            variant: 'filled',
            text1: toastTitle,
          })
        }
      })
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  return (
    <View style={styles.root}>
      <View style={styles.formHeader}>
        <Image source={theme.isDarkMode ? Assets.logoLightXs : Assets.logoDarkXs} style={styles.logo} resizeMode='contain' />
        <Typography variant='h2' gutterBottom fontWeight='bold'>
          Welcome back 👋
        </Typography>
        <Typography color='text.secondary'>Login to your account</Typography>
      </View>
      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='Email'
              labelSize='medium'
              variant='filled'
              placeholder='Email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='extra-large'
              isError={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message ? errors?.email?.message : undefined}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='Password'
              labelSize='medium'
              variant='filled'
              placeholder='Password'
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='extra-large'
              isError={Boolean(errors?.password?.message)}
              helperText={errors?.password?.message ? errors?.password?.message : undefined}
            />
          )}
        />
      </View>

      <View style={{ marginBottom: createSpacing(3) }}>
        <Button
          isLoading={loginLoading}
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Login'
          size='extra-large'
          startIcon='enter-outline'
          iconType='ionicons'
          rounded
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color='text.secondary'>Don't have an account ? </Typography>
        <Button onPress={() => nav.navigate('register_screen')} title='Register' variant='text' disablePadding />
      </View>
    </View>
  )
}

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
})

export default LoginForm
