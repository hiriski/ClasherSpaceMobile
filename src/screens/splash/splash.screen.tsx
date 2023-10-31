import { FC, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

// components
import { Screen } from '@/components/core'

// components
import { Splash } from '@/components/splash'

// utils
import { uiUtils } from '@/utilities'

const BACKGROUND_COLOR = '#2f3556'

const AppSplashScreen: FC = () => {
  useFocusEffect(
    useCallback(() => {
      uiUtils.changeNavbarBarColor(BACKGROUND_COLOR, true, false)
    }, [])
  )
  return (
    <Screen preset='fixed' statusBarStyle='light-content' backgroundColor={BACKGROUND_COLOR}>
      <Splash />
    </Screen>
  )
}

export default AppSplashScreen
