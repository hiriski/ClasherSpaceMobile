import { View, ScrollView, Animated, Keyboard } from 'react-native'
import { IconButton, StatusBar } from '@/components/core'
import { useTheme } from '@/hooks'
import { RegisterForm, RegisterFormStep2 } from '@/components/auth'
import { Assets } from '@/assets'
import { StyleSheet } from 'react-native'
import { themeConfig } from '@/config'
import { screenUtils } from '@/utilities'
import { useCallback, useEffect, useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationProps } from '@/navigators'

const FORM_STEP_1_HEIGHT = 580
const FORM_STEP_2_HEIGHT = 380
const EXTRA_KEYBOARD_OFFSET = 180

const RegisterScreen = (): JSX.Element => {
  const theme = useTheme()

  const [key, setKey] = useState(0)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const navigation = useNavigation<NavigationProps>()
  const insets = useSafeAreaInsets()

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
      <IconButton
        size='large'
        iconType='ionicons'
        style={{ position: 'absolute', top: insets.top, left: 10, zIndex: 1 }}
        iconColor='#ffffff'
        icon='arrow-back'
        onPress={() => navigation.goBack()}
      />
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
            <RegisterForm onSuccess={onStep1Success} />
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
