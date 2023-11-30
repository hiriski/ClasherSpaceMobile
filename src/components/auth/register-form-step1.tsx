import { FC, useState } from 'react'
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
import { useTheme } from '@/hooks'
import { useAuth } from '@/hooks/auth'

// config
import { appConfig } from '@/config'

// assets
import { Assets } from '@/assets'
import { IRequestRegister } from '@/api'

type FormValues = {
  name: string
  email: string
}

const schema = Yup.object()
  .shape({
    name: Yup.string().required('Please input your name'),
    email: Yup.string().email('Please input a valid email').required('Please input your email'),
  })
  .required()

interface Props {
  onSubmit: (value: Pick<IRequestRegister, 'name' | 'email'>) => void
}

const RegisterFormStep1: FC<Props> = ({ onSubmit }): JSX.Element => {
  const nav = useNavigation<NavigationProps>()
  const theme = useTheme()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = values => {
    onSubmit(values)
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
        <Typography color='text.secondary'>Create your {appConfig.appName} account</Typography>
      </View>
      <View style={{ marginBottom: createSpacing(2) }}>
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
                size='large'
                isError={Boolean(errors?.name?.message)}
                helperText={errors?.name?.message ? errors?.name?.message : undefined}
              />
            )}
          />
        </View>
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
      </View>
      <View style={{ marginBottom: createSpacing(3) }}>
        <Button
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Next'
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

export default RegisterFormStep1
