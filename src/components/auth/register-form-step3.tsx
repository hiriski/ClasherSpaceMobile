import { FC, memo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, TextField, Typography } from '@/components/core'

// utils
import { screenUtils } from '@/utilities'
import { createSpacing, log } from '@/helpers'

// hook form
import * as Yup from 'yup'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Assets } from '@/assets'

type FormValues = {
  password: string
  password_confirmation: string
}

const schema = Yup.object()
  .shape({
    password: Yup.string().required('Please input your password'),
    password_confirmation: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  .required()

type Props = {
  onSubmit: (email: string) => void
  onPressBack: () => void
}

const RegisterFormStep3: FC<Props> = ({ onSubmit, onPressBack }: Props): JSX.Element => {
  log.info('RENDER RegisterFormStep3')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = ({ email }) => {
    onSubmit(email)
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  return (
    <View style={styles.root}>
      <View style={styles.formHeader}>
        <Image source={Assets.passwordIcon} style={styles.img} resizeMode='contain' />
        <Typography variant='h1' fontWeight='700' gutterBottom color='text.primary'>
          Almost done
        </Typography>
        <Typography variant='h6' fontWeight='700' gutterBottom color='text.primary'>
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
              size='extra-large'
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
              size='extra-large'
              isError={Boolean(errors?.password_confirmation?.message)}
              helperText={errors?.password_confirmation?.message ? errors?.password_confirmation?.message : undefined}
            />
          )}
        />
      </View>
      <View style={{ marginBottom: createSpacing(4) }}>
        <Button
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='NEXT'
          size='extra-large'
          endIcon='arrow-forward'
          iconType='ionicons'
          rounded
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={onPressBack} size='extra-large' title='Back' variant='text' disablePadding />
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
    marginBottom: createSpacing(5),
  },
  img: {
    height: 80,
    width: 80,
    marginLeft: -8,
    marginBottom: createSpacing(3),
  },
})

export default memo(RegisterFormStep3)
