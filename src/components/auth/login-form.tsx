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
}

const schema = Yup.object()
  .shape({
    email: Yup.string().email('Please input a valid email').required('Please input your email'),
    password: Yup.string().required('Please input your password'),
  })
  .required()

const LoginForm = (): JSX.Element => {
  const nav = useNavigation<NavigationProps>()

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
      <View>
        <Button
          isLoading={loginLoading}
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Sign In'
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

export default LoginForm
