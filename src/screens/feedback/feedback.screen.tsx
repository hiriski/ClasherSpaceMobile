import { View, ScrollView, Animated, Keyboard } from 'react-native'
import { StatusBar } from '@/components/core'
import { useTheme } from '@/hooks'
import { RegisterFormStep2 } from '@/components/auth'
import { Assets } from '@/assets'
import { StyleSheet } from 'react-native'
import { themeConfig } from '@/configs'
import { screenUtils } from '@/utilities'
import { JSX, useCallback, useEffect, useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'
import { FeedbackForm } from '@/components/feedback'

const FORM_STEP_1_HEIGHT = 580
const FORM_STEP_2_HEIGHT = 380
const EXTRA_KEYBOARD_OFFSET = 180

const RegisterScreen = (): JSX.Element => {
  const theme = useTheme()

  const [key, setKey] = useState(0)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const pagerRef = useRef<PagerView>(null)
  const animatedImageRef = useRef(new Animated.Value(screenUtils.height - FORM_STEP_1_HEIGHT)).current

  useEffect(() => {
    if (key === 0) {
      Animated.timing(animatedImageRef, {
        toValue: keyboardVisible
          ? screenUtils.height - FORM_STEP_1_HEIGHT - EXTRA_KEYBOARD_OFFSET
          : screenUtils.height - FORM_STEP_1_HEIGHT,
        duration: 320,
        useNativeDriver: false,
      }).start()
    }
    if (key === 1) {
      Animated.timing(animatedImageRef, {
        toValue: keyboardVisible
          ? screenUtils.height - FORM_STEP_2_HEIGHT - EXTRA_KEYBOARD_OFFSET
          : screenUtils.height - FORM_STEP_2_HEIGHT,
        duration: keyboardVisible ? 320 : 500,
        useNativeDriver: false,
      }).start()
    }
  }, [key, keyboardVisible])

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

  const onStep1Success = useCallback(() => {
    pagerRef?.current?.setPage(1)
    setKey(1)
  }, [pagerRef.current])

  return (
    <>
      <StatusBar translucent barStyle='light-content' />
      <Animated.Image
        source={Assets.clashOfClans3}
        style={{
          height: animatedImageRef,
          width: screenUtils.width,
        }}
        resizeMode='cover'
      />
      <View style={StyleSheet.flatten([styles.root, { backgroundColor: theme.palette.background.paper }])}>
        <PagerView ref={pagerRef} style={styles.pagerView} orientation='horizontal' initialPage={0} scrollEnabled={false}>
          <ScrollView key='1' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
            <FeedbackForm onSuccess={onStep1Success} />
          </ScrollView>
          <ScrollView key='2' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
            <RegisterFormStep2 />
          </ScrollView>
        </PagerView>
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
  pagerView: {
    flex: 1,
  },
})

export default RegisterScreen
