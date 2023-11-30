import { FC } from 'react'
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native'

// components
import { Typography } from '@/components/core'

// config
import { appConfig, themeConfig } from '@/config'

// utils
import { screenUtils } from '@/utilities'
import { createSpacing } from '@/helpers'

// assets
import { Assets } from '@/assets'

const BACKGROUND_COLOR = '#2f3556'

const Splash: FC = () => {
  return (
    <>
      <View style={styles.root}>
        <Image source={Assets.logoLightSm} style={styles.logo} resizeMode='contain' />
        <Typography variant='h3' color='common.white' fontWeight='bold'>
          {appConfig.appName}
        </Typography>
        <View style={styles.loadingSpace}>
          <ActivityIndicator color={themeConfig.paletteBase.secondary.main} size={28} />
        </View>
      </View>
      <View style={styles.footer}>
        <Typography variant='body2' color='text.disabled'>
          Made with ❤️
        </Typography>
      </View>
    </>
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
    marginTop: -22,
    backgroundColor: BACKGROUND_COLOR,
  },
  logo: {
    height: 110,
    marginBottom: createSpacing(5),
  },
  footer: {
    marginTop: 'auto',
    marginBottom: createSpacing(8),
    alignItems: 'center',
  },
  loadingSpace: {
    marginTop: 12,
    height: 30,
  },
})

export default Splash
