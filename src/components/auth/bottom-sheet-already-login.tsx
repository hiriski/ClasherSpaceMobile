import { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationProps } from '@/navigators/navigation.type'

// hooks
import { useNavigation } from '@react-navigation/native'
import { createSpacing } from '@/helpers'
import { BaseBottomSheet } from '@/components/base'

// components
import { Typography } from '@/components/core'

import { themeConfig } from '@/config'
import { useTheme } from '@/hooks'
import { useAuth } from '@/hooks/auth'
import { screenUtils } from '@/utilities'

const BottomSheetContent = () => {
  const theme = useTheme()
  const { user } = useAuth()
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
        <Typography variant='h5' fontWeight='bold' gutterBottom style={{ textAlign: 'center' }}>
          Hey,
        </Typography>
        <Typography variant='h4' gutterBottom={4} style={{ textAlign: 'center' }}>
          You already login as {user?.displayName ?? user?.email ?? ''}
        </Typography>
        <Typography variant='h6' gutterBottom style={{ textAlign: 'center' }}>
          Do you want to sign out and register again ?
        </Typography>
      </View>
    </View>
  )
}

const BottomSheetAlreadyLogin = () => {
  const nav = useNavigation<NavigationProps>()
  const { auth_resetAuth, isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        setOpen(true)
      }, 250)
    }
    return () => {
      setOpen(false)
    }
  }, [isAuthenticated])

  const onConfirmRegisterAgain = (): void => {
    setOpen(false)
    auth_resetAuth()
  }

  const onBottomSheetClose = () => {}

  return (
    <BaseBottomSheet
      open={open}
      onClose={onBottomSheetClose}
      enableCloseButton={false}
      snapPoints={[320]}
      onOpenSnapToIndex={0}
      enablePanDownToClose={false}
      backdropPressBehavior='none'
      enableFooterButton={true}
      enableFooterButtonTitle='Register Again'
      onPressFooterButton={onConfirmRegisterAgain}
      footerButtonPressBehavior='close'
      footerButtonEndIcon='arrow-forward'
      footerButtonIconProvider='ionicons'
      footerButtonSize='extra-large'
      footerButtonColor='primary'
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

export default memo(BottomSheetAlreadyLogin)
