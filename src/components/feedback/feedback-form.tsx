import { FC, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextField, Typography, Select } from '@/components/core'

// helpers / utils
import { createSpacing, firebaseHelpers, log } from '@/helpers'

// hook form
import * as Yup from 'yup'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler, Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// hooks
import { useFeedback } from '@/hooks'
import { useAuth } from '@/hooks/auth'

// firestore
// import firestore from '@react-native-firebase/firestore'

type FormValues = {
  userId: string | null
  email: string
  type: string
  body: string
}

const schema = Yup.object()
  .shape({
    userId: Yup.string().nullable(),
    type: Yup.string().required('Please select feedback type'),
    email: Yup.string().email('Please input a valid email').required('Please input your email'),
    body: Yup.string().required('Please input message'),
  })
  .required()

interface Props {
  onSubmitSuccess: () => void
}

const SELECT_OPTIONS = [
  {
    label: 'Select Type',
    value: null,
  },
  {
    label: 'Missing Feature',
    value: 'missing_feature',
  },
  {
    label: 'I Found Bug on Clasher Space',
    value: 'bug',
  },
  {
    label: 'Improvement',
    value: 'improvement',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const FeedbackForm: FC<Props> = ({ onSubmitSuccess }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const { feedback_setHasSubmittedFeedback } = useFeedback()

  const { user } = useAuth()

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues, any>,
    defaultValues: {
      userId: '',
      email: '',
      type: '',
      body: '',
    },
  })

  const onValidSubmit: SubmitHandler<FormValues> = async values => {
    setIsLoading(true)
    setTimeout(() => {
      firestore()
        .collection('feedbacks')
        .add(firebaseHelpers.docsWithCreatedAt(values))
        .then(() => {
          setIsLoading(false)
          if (typeof onSubmitSuccess === 'function') {
            onSubmitSuccess()
            feedback_setHasSubmittedFeedback(true)
            reset()
          }
        })
        .catch(() => {
          setIsLoading(false)
        })
    }, 500)
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  useEffect(() => {
    if (user?.email) {
      setValue('userId', user.uid)
      setValue('email', user.email)
    }
  }, [user])

  return (
    <View style={styles.root}>
      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='type'
          render={({ field: { onChange, value } }) => (
            <Select
              label='Feedback type'
              variant='filled'
              options={SELECT_OPTIONS}
              value={value}
              onChange={val => onChange(val)}
              margin='normal'
              size='large'
              isError={Boolean(errors?.type?.message)}
              helperText={errors?.type?.message ? errors?.type?.message : null}
            />
          )}
        />
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
              helperText={errors?.email?.message ? errors?.email?.message : 'This email to reply to your feedback'}
            />
          )}
        />
        <Controller
          control={control}
          name='body'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label='Feedback'
              labelSize='medium'
              placeholder='Type your feedback'
              onBlur={onBlur}
              variant='filled'
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='large'
              isError={Boolean(errors?.body?.message)}
              helperText={errors?.body?.message ? errors?.body?.message : undefined}
              multiline
              numberOfLines={8}
            />
          )}
        />
      </View>
      <View style={{ marginBottom: createSpacing(3) }}>
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
          title='Submit Feedback'
          size='extra-large'
          endIcon='send'
          color='success'
          iconType='material-community-icons'
          rounded
        />
      </View>
      <View style={{ marginTop: 'auto', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
          <Typography variant='subtitle2' color='text.secondary' gutterBottom style={{ textAlign: 'center' }}>
            Important Notice: Clash of Stats is independent and not related to SuperCell or any particular Clan or Player.
          </Typography>
          <Typography variant='subtitle2' color='text.secondary' gutterBottom style={{ textAlign: 'center' }}>
            If you have feedback regarding Clash of Clans, please contact SuperCell inside the Game.
          </Typography>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
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

export default FeedbackForm
