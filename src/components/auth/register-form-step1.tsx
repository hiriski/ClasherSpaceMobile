import { FC, memo, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextField, Typography } from '@/components/core'

// utils
import { screenUtils } from '@/utilities'
import { createSpacing, log } from '@/helpers'

// hook form
import * as Yup from 'yup'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { appConfig } from '@/configs'
import { Image } from 'react-native'
import { useTheme } from '@/hooks'
import { Assets } from '@/assets'
import { useNavigation } from '@/navigator'

type FormValues = {
  name: string
}

const schema = Yup.object()
  .shape({
    name: Yup.string().required('Please input your name').min(3).max(50),
  })
  .required()

type Props = {
  defaultValue: string
  onSubmit: (name: string) => void
}

const RegisterFormStep1: FC<Props> = ({ defaultValue, onSubmit }: Props): JSX.Element => {
  const theme = useTheme()

  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = ({ name }) => {
    onSubmit(name)
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  const onPressLogin = useCallback(() => {
    navigation.navigate('login_screen')
  }, [])

  useEffect(() => {
    setValue('name', defaultValue)
  }, [defaultValue])

  return (
    <View style={styles.root}>
      <View style={styles.formHeader}>
        <Image source={theme.isDarkMode ? Assets.logoLightXs : Assets.logoDarkXs} style={styles.logo} resizeMode='contain' />
        <Typography variant='h2' fontWeight='bold' style={{ textAlign: 'center' }}>
          Create your
        </Typography>
        <Typography variant='h2' fontWeight='bold' style={{ textAlign: 'center', marginBottom: createSpacing(5) }}>
          {appConfig.appName} account
        </Typography>
        <Typography variant='h6' gutterBottom color='text.secondary'>
          Tell us about yourself
        </Typography>
      </View>

      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='How we call you?'
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: createSpacing(6) }}>
        <Typography color='text.secondary'>Already have account ? </Typography>
        <Button onPress={onPressLogin} title='Login' variant='text' disablePadding />
      </View>
    </View>
  )
}
const LOGO_SIZE = 72

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: screenUtils.width / 1.2,
    alignSelf: 'center',
    paddingTop: createSpacing(6),
    paddingBottom: createSpacing(3),
  },
  formHeader: {
    marginTop: createSpacing(5),
    marginBottom: createSpacing(4),
    alignItems: 'center',
    paddingHorizontal: 44,
  },
  logo: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
    marginBottom: createSpacing(4),
  },
})

export default memo(RegisterFormStep1)
