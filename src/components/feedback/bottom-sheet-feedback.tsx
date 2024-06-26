import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

// hooks
import { useApp, useFeedback, useTheme } from '@/hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// components
import FeedbackForm from './feedback-form'
import { Button, Divider, IconButton, MaterialCommunityIcon, Typography } from '@/components/core'
import BaseBottomSheetBackdrop from '../base/base-bottom-sheet/base-bottom-sheet-backdrop'

import BottomSheet, { BottomSheetBackdropProps, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { bottomSheetStyles } from '@/components/base/base-bottom-sheet/base-bottom-sheet.styles'

// helpers / utils
import { screenUtils } from '@/utilities'
import { createSpacing } from '@/helpers'

// config
import { themeConfig } from '@/config'
import { useAppDispatch } from '@/store'

const BottomSheetFeedback = () => {
  const ref = useRef<BottomSheet>(null)
  const theme = useTheme()

  const dispatch = useAppDispatch()

  const insets = useSafeAreaInsets()

  const SNAP_POINTS = useMemo(() => [320, 732, screenUtils.height + insets.top], [])

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  const { openBottomSheet, feedback_setOpenBottomSheet } = useFeedback()

  const { visibleBottomTab, app_setVisibleBottomTab } = useApp()

  const handleClose = (): void => {
    ref.current?.snapToIndex(-1)
    feedback_setOpenBottomSheet(false)
    dispatch(app_setVisibleBottomTab(true))
  }

  useEffect(() => {
    if (openBottomSheet) {
      ref?.current?.snapToIndex(1)
      dispatch(app_setVisibleBottomTab(false))
      handleClose()
    }
  }, [visibleBottomTab, openBottomSheet])

  const onBottomSheetChange = useCallback(
    (index: number) => {
      if (index < 0) {
        handleClose()
        dispatch(app_setVisibleBottomTab(true))
      } else {
        dispatch(app_setVisibleBottomTab(false))
      }
    },
    [openBottomSheet]
  )

  const onPressCloseButton = useCallback(() => {
    ref.current?.close()
  }, [ref?.current, visibleBottomTab, openBottomSheet])

  const onSubmitSuccess = useCallback(() => {
    setIsSubmitSuccess(true)
    ref.current?.snapToIndex(0)
  }, [ref?.current, visibleBottomTab, openBottomSheet, isSubmitSuccess])

  const onPressFinish = useCallback(() => {
    setIsSubmitSuccess(false)
    ref.current?.close()
  }, [ref?.current, visibleBottomTab, openBottomSheet, isSubmitSuccess])

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BaseBottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    []
  )

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={renderBackdrop}
      snapPoints={SNAP_POINTS}
      enablePanDownToClose={true}
      style={StyleSheet.flatten([bottomSheetStyles.bottomSheet_root])}
      handleIndicatorStyle={bottomSheetStyles.bottomSheet_handleIndicatorStyle}
      backgroundStyle={StyleSheet.flatten([
        bottomSheetStyles.bottomSheet_backgroundStyle,
        {
          backgroundColor: theme.palette.background.paper,
          borderRadius: themeConfig.shape.borderRadius * 4,
        },
      ])}
      onChange={onBottomSheetChange}
    >
      <View
        style={{
          zIndex: 10,
          top: 0,
          right: createSpacing(4),
          position: 'absolute',
          alignSelf: 'flex-end',
        }}
      >
        <IconButton size='large' onPress={onPressCloseButton} icon='close' iconType='ionicons' />
      </View>
      <BottomSheetScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.content}>
        {isSubmitSuccess ? (
          <View style={styles.feedbackSubmitted}>
            <View style={StyleSheet.flatten([styles.boxIcon, { backgroundColor: theme.palette.success.main }])}>
              <MaterialCommunityIcon name='send-check' size={32} style={{ color: theme.palette.success.light }} />
            </View>
            <Typography variant='h3' fontWeight='bold' gutterBottom={1.2} color='text.secondary' style={{ textAlign: 'center' }}>
              Thank you!
            </Typography>
            <Typography gutterBottom={5} color='text.secondary' style={{ textAlign: 'center' }}>
              We love hearing from you! Thank you for leaving feedback for us.
            </Typography>
            <View style={{ marginBottom: createSpacing(3), width: 180 }}>
              <Button onPress={onPressFinish} title='Done' size='large' rounded color='primary' variant='contained' />
            </View>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <MaterialCommunityIcon
                name='message-badge'
                size={26}
                style={{ marginRight: createSpacing(2), color: theme.palette.success.main }}
              />
              <Typography variant='h2' fontWeight='bold' gutterBottom>
                Send Feedback
              </Typography>
            </View>
            <Typography gutterBottom color='text.secondary'>
              Are you in need of a feature? or found something to improve?
            </Typography>
            <Typography gutterBottom={4} color='text.secondary'>
              A nasty little bug annoys you? Please let us know here!
            </Typography>
            <Divider />
            <FeedbackForm onSubmitSuccess={onSubmitSuccess} />
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: createSpacing(8),
    paddingTop: createSpacing(3),
    marginBottom: createSpacing(3),
  },
  boxIcon: {
    width: 80,
    height: 80,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: createSpacing(3),
  },
  feedbackSubmitted: {
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
})

export default memo(BottomSheetFeedback)
