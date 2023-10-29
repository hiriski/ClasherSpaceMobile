import { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'
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

// config
import { appConfig } from '@/config'

// assets
import { Assets } from '@/assets'

type FormValues = {
  email: string
  password: string
  password_confirmation: string
}

const schema = Yup.object()
  .shape({
    email: Yup.string().email('Please input a valid email').required('Please input your email'),
    password: Yup.string().required('Please input your password'),
    password_confirmation: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  .required()

interface Props {
  onSuccess: () => void
}

const RegisterForm: FC<Props> = ({ onSuccess }): JSX.Element => {
  const nav = useNavigation<NavigationProps>()
  const { showToast } = useToast()
  const theme = useTheme()

  const { auth_setRegisterLoading, registerLoading } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = values => {
    auth_setRegisterLoading(true)
    const { email, password } = values
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  return (
    <View style={styles.root}>
      <View style={styles.formHeader}>
        <Image source={theme.isDarkMode ? Assets.logoLightXs : Assets.logoDarkXs} style={styles.logo} resizeMode='contain' />
        <Typography variant='h2' gutterBottom fontWeight='bold'>
          Sign Up ⚔️
        </Typography>
        <Typography color='text.secondary'>Create to your {appConfig.appName} account</Typography>
      </View>
      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='Email'
              labelSize='medium'
              placeholder='Email'
              onBlur={onBlur}
              variant='filled'
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='large'
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
              label='Confirm Pasword'
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
      <View style={{ marginBottom: createSpacing(3) }}>
        <Button
          isLoading={registerLoading}
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Create Account'
          size='extra-large'
          endIcon='arrow-forward'
          iconType='ionicons'
          rounded
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: createSpacing(6) }}>
        <Typography color='text.secondary'>Already have account ? </Typography>
        <Button onPress={() => nav.navigate('login_screen')} title='Login' variant='text' disablePadding />
      </View>
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

export default RegisterForm
