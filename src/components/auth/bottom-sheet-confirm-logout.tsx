import { memo, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationProps } from '@/navigators/navigation.type'

// hooks
import { useNavigation } from '@react-navigation/native'
import { createSpacing } from '@/helpers'
import { BaseBottomSheet } from '@/components/base'

// components
import { Typography } from '@/components/core'

import { themeConfig } from '@/config'
import { useApp, useTheme } from '@/hooks'
import { useAuth } from '@/hooks/auth'
import { screenUtils } from '@/utilities'
import { useAppDispatch } from '@/store'

const BottomSheetContent = () => {
  const theme = useTheme()
  const { isAuthenticated } = useAuth()

  return (
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
          <>
            <Typography variant='h5' fontWeight='bold' gutterBottom style={{ textAlign: 'center' }}>
              Are you sure ?
            </Typography>
            <Typography variant='h6' fontWeight='bold' gutterBottom style={{ textAlign: 'center' }}>
              Do you want to log out ?
            </Typography>
          </>
        ) : (
          <>
            <Typography variant='h5' fontWeight='bold' gutterBottom style={{ textAlign: 'center' }}>
              See you..
            </Typography>
          </>
        )}
      </View>
    </View>
  )
}

const BottomSheetConfirmLogout = () => {
  const nav = useNavigation<NavigationProps>()
  const dispatch = useAppDispatch()
  const { auth_resetAuth, openBottomSheetConfirmLogout, auth_setOpenBottomSheetConfirmLogout } = useAuth()

  const { visibleBottomTab, app_setVisibleBottomTab } = useApp()

  const handleLogout = (): void => {
    auth_resetAuth()
  }

  const onBottomSheetClose = useCallback(() => {
    dispatch(app_setVisibleBottomTab(true))
    auth_setOpenBottomSheetConfirmLogout(false)
  }, [visibleBottomTab, openBottomSheetConfirmLogout])

  useEffect(() => {
    if (openBottomSheetConfirmLogout) {
      dispatch(app_setVisibleBottomTab(false))
    }
  }, [openBottomSheetConfirmLogout, visibleBottomTab])

  return (
    <BaseBottomSheet
      open={openBottomSheetConfirmLogout}
      onClose={onBottomSheetClose}
      enableCloseButton={false}
      snapPoints={[260]}
      onOpenSnapToIndex={0}
      enableFooterButton={true}
      enableFooterButtonTitle='Yes, Logout'
      onPressFooterButton={handleLogout}
      footerButtonPressBehavior='close'
      footerButtonEndIcon='arrow-forward'
      footerButtonIconProvider='ionicons'
      footerButtonSize='extra-large'
      footerButtonColor='error'
      footerButtonVariant='contained'
      footerButtonStyle={{
        width: screenUtils.isSmallScreen ? 220 : 300,
        alignSelf: 'center',
      }}
    >
      <BottomSheetContent />
    </BaseBottomSheet>
  )
}

const styles = StyleSheet.create({
  root: {},
  content: {
    paddingHorizontal: themeConfig.horizontalSpacing,
    marginBottom: createSpacing(3),
    paddingTop: 20,
  },
})

export default memo(BottomSheetConfirmLogout)
