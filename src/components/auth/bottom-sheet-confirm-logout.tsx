import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { createSpacing } from '@/helpers'

// components
import { Button, Typography } from '@/components/core'

import { themeConfig } from '@/configs'
import { useTheme } from '@/hooks'
import { useAuth } from '@/hooks/auth'
import { BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet'
import BaseBottomSheetBackdrop from '../base/base-bottom-sheet/base-bottom-sheet-backdrop'
import { bottomSheetStyles } from '../base/base-bottom-sheet/base-bottom-sheet.styles'
import { useAppDispatch } from '@/store'

type Props = {}

type Ref = BottomSheetModal

const BottomSheetConfirmLogout = forwardRef<Ref, Props>((props, ref) => {
  const theme = useTheme()
  const { isAuthenticated, accessToken, auth_revokeToken } = useAuth()
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [snapIndex, setSnapIndex] = useState(0)
  const snapPoints = useMemo(() => [240, 170], [])

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BaseBottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    []
  )

  const handleSheetChanges = useCallback(
    (index: number) => {
      setSnapIndex(index)
    },
    [snapIndex]
  )

  const handleClose = useCallback(() => {
    ref?.current?.close()
  }, [snapIndex, ref?.current])

  const onPressLogout = useCallback(() => {
    setIsLoading(true)
    handleClose()
    dispatch(auth_revokeToken(accessToken as string)).finally(() => {
      setSnapIndex(1)
      setIsLoading(false)
    })
  }, [isAuthenticated, isLoading, setSnapIndex])

  useEffect(() => {
    setSnapIndex(0)
  }, [snapIndex])

  return (
    <BottomSheetModal
      ref={ref}
      index={snapIndex}
      stackBehavior='push'
      enableDismissOnClose={true}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={StyleSheet.flatten([bottomSheetStyles.bottomSheet_root])}
      handleIndicatorStyle={bottomSheetStyles.bottomSheet_handleIndicatorStyle}
      backgroundStyle={StyleSheet.flatten([
        bottomSheetStyles.bottomSheet_backgroundStyle,
        {
          backgroundColor: theme.palette.background.paper,
          borderRadius: themeConfig.shape.borderRadius * 6,
        },
      ])}
      onChange={handleSheetChanges}
    >
      <View
        style={StyleSheet.flatten([
          styles.root,
          {
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
          },
        ])}
      >
        <View style={styles.content}>
          {isAuthenticated ? (
            <View>
              <Typography variant='h6' fontWeight='bold' color='text.secondary' style={{ textAlign: 'center', marginBottom: 10 }}>
                Logged out
              </Typography>
              <Typography variant='h3' fontWeight='bold' gutterBottom style={{ textAlign: 'center', marginBottom: 24 }}>
                Do you want to log out?
              </Typography>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  title='LOGOUT'
                  variant='contained'
                  color='error'
                  size='large'
                  rounded
                  style={{ width: 160 }}
                  startIcon='enter-outline'
                  iconType='ionicons'
                  onPress={onPressLogout}
                  isLoading={isLoading}
                />
                <Button title='No' variant='text' color='info' size='extra-large' onPress={handleClose} />
              </View>
            </View>
          ) : (
            <View>
              <Typography variant='h3' fontWeight='bold' style={{ textAlign: 'center', marginBottom: 16 }}>
                See you...
              </Typography>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  title='Back to home'
                  variant='contained'
                  color='info'
                  size='large'
                  rounded
                  style={{ width: 160 }}
                  startIcon='arrow-back'
                  iconType='ionicons'
                  onPress={onPressLogout}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  root: {},
  content: {
    paddingHorizontal: themeConfig.horizontalSpacing,
    marginBottom: createSpacing(3),
    paddingTop: 20,
  },
})

export default memo(BottomSheetConfirmLogout)
