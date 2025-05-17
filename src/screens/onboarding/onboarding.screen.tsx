import { JSX, useCallback } from 'react'
import { View } from 'react-native'

// components
import { Button, Screen, Typography } from '@/components/core'

// hooks
import { useTheme } from '@/hooks'
import { useNavigation } from '@react-navigation/native'

// utils
import { storageUtils } from '@/utilities'

// interfaces
import { NavigationProps } from '@/navigators'

const OnboardingScreen = (): JSX.Element => {
  const theme = useTheme()
  const nav = useNavigation<NavigationProps>()

  const onPressFinish = useCallback(() => {
    storageUtils.save('IS_ALREADY_LAUNCHED', true)
    nav.replace('bottom_tab_stack')
  }, [])

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography color='text.disabled' style={{ textAlign: 'center' }} gutterBottom={2}>
          Onboarding Screen
        </Typography>
        <Button title='Finish onboarding' onPress={onPressFinish} />
      </View>
    </Screen>
  )
}

export default OnboardingScreen
