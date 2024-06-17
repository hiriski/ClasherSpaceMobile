import { FC, memo, useEffect } from 'react'
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
  email: string
}

const schema = Yup.object()
  .shape({
    email: Yup.string().email('Please input a valid email').required('Please input your email'),
  })
  .required()

type Props = {
  defaultValue: string
  onSubmit: (email: string) => void
  onPressBack: () => void
  name: string
}

const RegisterFormStep2: FC<Props> = ({ defaultValue, onSubmit, onPressBack, name }: Props): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = ({ email }) => {
    onSubmit(email)
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  useEffect(() => {
    setValue('email', defaultValue)
  }, [defaultValue])

  return (
    <View style={styles.root}>
      <View style={styles.formHeader}>
        <Image source={Assets.hiGesture} style={styles.img} resizeMode='contain' />
        <Typography variant='h1' fontWeight='700' gutterBottom color='text.primary'>
          Hi, {name}
        </Typography>
      </View>
      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='What your email?'
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

export default memo(RegisterFormStep2)
