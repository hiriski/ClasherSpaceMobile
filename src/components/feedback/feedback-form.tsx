import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextField, Typography, BottomSheetDropdown } from '@/components/core'

// hook form
import * as Yup from 'yup'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler, Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// helpers / utils
import { createSpacing, log } from '@/helpers'

// hooks
import { useToast } from '@/hooks'
import { FeedbackApi, IRequestCreateFeedback } from '@/api'

type FormValues = IRequestCreateFeedback

const schema = Yup.object()
  .shape({
    type: Yup.string()
      .required('Please select feedback type')
      .oneOf(['bug', 'missing_feature', 'improvement', 'other'], 'Please select feedback type'),
    email: Yup.string().email('Please input a valid email').required('Please input your email'),
    body: Yup.string().required('Please input message'),
  })
  .required()

interface Props {
  onSubmitSuccess: () => void
}

const SELECT_OPTIONS = [
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

  const { showToast } = useToast()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues, any>,
    defaultValues: {
      email: '',
      type: '',
      body: '',
    } as unknown as FormValues,
  })

  const onValidSubmit: SubmitHandler<FormValues> = async values => {
    setIsLoading(true)
    try {
      const response = await FeedbackApi.createFeedback(values)
      setIsLoading(false)
      if (response.id) {
        if (typeof onSubmitSuccess === 'function') {
          onSubmitSuccess()
          reset()
        }
      }
    } catch (e) {
      showToast({
        text1: 'Opss.. Failed to send feedback.',
        variant: 'filled',
        position: 'top',
        type: 'error',
      })
      setIsLoading(false)
    }
  }

  const onInvalidSubmit: SubmitErrorHandler<FormValues> = values => {
    log.info(`values -> ${JSON.stringify(values)}`)
  }

  return (
    <View style={styles.root}>
      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name='type'
          render={({ field: { onChange, value } }) => (
            <BottomSheetDropdown
              value={value}
              onChange={onChange}
              label='Feedback Type'
              options={SELECT_OPTIONS}
              closeAfterSelect={true}
              margin='normal'
              size='large'
              variant='filled'
              placeholder='Select Feedback Type'
              bottomSheetHeight={320}
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
              autoCapitalize='none'
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
              placeholder='Your feedback..'
              onBlur={onBlur}
              variant='filled'
              onChangeText={onChange}
              value={value}
              margin='normal'
              size='large'
              isError={Boolean(errors?.body?.message)}
              helperText={errors?.body?.message ? errors?.body?.message : undefined}
              multiline
              rows={4}
              maxRows={10}
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
