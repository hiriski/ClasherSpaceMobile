import { StyleSheet, View } from 'react-native'

// components
import { Screen, Typography } from '@/components/core'

// hooks
import { appConfig } from '@/config'

import { screenUtils } from '@/utilities'
import { useTheme } from '@/hooks'
import { createSpacing } from '@/helpers'

const AppSplashScreen = () => {
  const theme = useTheme()
  return (
    <Screen preset='fixed' statusBarStyle='dark-content' backgroundColor={theme.palette.background.paper}>
      <View style={styles.root}>
        <Typography variant='h2'>{appConfig.appName}</Typography>
      </View>
      <View style={styles.footer}>
        <Typography color='text.secondary' variant='body2' gutterBottom>
          Made with ❤️
        </Typography>
        <Typography color='text.secondary' variant='body2'>
          South Beach, Palabuhanratu - Indonesia
        </Typography>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: screenUtils.width,
    height: screenUtils.height,
    zIndex: 1000,
  },
  logo: {
    height: 82,
    marginBottom: createSpacing(4),
  },
  text: {},
  title: {
    marginBottom: createSpacing(1),
  },
  footer: {
    marginTop: 'auto',
    marginBottom: createSpacing(6),
    alignItems: 'center',
  },
})

export default AppSplashScreen
