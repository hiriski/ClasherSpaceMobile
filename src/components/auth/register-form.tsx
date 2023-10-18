import { StyleSheet, View } from 'react-native'
import { Button, TextField } from '@/components/core'
import auth from '@react-native-firebase/auth'

// utils
import { screenUtils } from '@/utilities'
import { log } from '@/helpers'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/navigators'

// hook form
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useToast } from '@/hooks'
import { useAuth } from '@/hooks/auth'

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

const RegisterForm = (): JSX.Element => {
  const nav = useNavigation<NavigationProps>()
  const { showToast } = useToast()

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
    log.info(`values -> ${JSON.stringify(values)}`)

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth_setRegisterLoading(false)
        nav.navigate('profile_screen')
        showToast({
          type: 'success',
          position: 'bottom',
          variant: 'filled',
          text1: 'Register Success',
        })
      })
      .catch(error => {
        auth_setRegisterLoading(false)
        let toastTitle = ''
        if (error?.code === 'auth/email-already-in-use') {
          toastTitle = 'That email address is already in use!'
        }
        if (error?.code === 'auth/invalid-email') {
          toastTitle = 'That email address is invalid!'
        }
        showToast({
          type: 'error',
          position: 'bottom',
          variant: 'filled',
          text1: toastTitle,
        })
      })
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  return (
    <View style={styles.root}>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label='Email'
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            margin='normal'
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
            placeholder='Password'
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            margin='normal'
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
            placeholder='Confirm Password'
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            margin='normal'
            isError={Boolean(errors?.password_confirmation?.message)}
            helperText={errors?.password_confirmation?.message ? errors?.password_confirmation?.message : undefined}
          />
        )}
      />
      <View>
        <Button
          isLoading={registerLoading}
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Create Account'
          size='large'
          startIcon='enter-outline'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: screenUtils.width / 1.3,
    alignSelf: 'center',
  },
})

export default RegisterForm
