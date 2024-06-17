import { useEffect, useRef, useState } from 'react'
import { View, ScrollView, Animated, Keyboard } from 'react-native'
import { StatusBar } from '@/components/core'
import { useTheme } from '@/hooks'
import { LoginForm } from '@/components/auth'
import { Assets } from '@/assets'
import { StyleSheet } from 'react-native'
import { themeConfig } from '@/configs'
import { platformUtils, screenUtils } from '@/utilities'

const ESTIMATE_FORM_HEIGHT = 535
const EXTRA_KEYBOARD_OFFSET = platformUtils.isIOS ? 300 : 180

const LoginScreen = (): JSX.Element => {
  const theme = useTheme()

  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const animatedImageRef = useRef(new Animated.Value(screenUtils.height - ESTIMATE_FORM_HEIGHT)).current

  useEffect(() => {
    Animated.timing(animatedImageRef, {
      toValue: keyboardVisible
        ? screenUtils.height - ESTIMATE_FORM_HEIGHT - EXTRA_KEYBOARD_OFFSET
        : screenUtils.height - ESTIMATE_FORM_HEIGHT,
      duration: 250,
      useNativeDriver: false,
    }).start()
  }, [keyboardVisible])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <>
      <StatusBar translucent barStyle='light-content' />
      <Animated.Image
        source={Assets.clashOfClans1}
        style={{
          height: animatedImageRef,
          width: screenUtils.width,
        }}
        resizeMode='cover'
      />
      <View style={StyleSheet.flatten([styles.root, { backgroundColor: theme.palette.background.paper }])}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
          <LoginForm />
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderTopRightRadius: themeConfig.shape.borderRadius * 4,
    borderTopLeftRadius: themeConfig.shape.borderRadius * 4,
    marginTop: -30,
  },
})

export default LoginScreen
