import { View, ScrollView, Animated, Keyboard } from 'react-native'
import { StatusBar } from '@/components/core'
import { useTheme } from '@/hooks'
import { Assets } from '@/assets'
import { StyleSheet } from 'react-native'
import { screenUtils } from '@/utilities'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'
import { log } from '@/helpers'
import { IRequestRegister } from '@/api'
import { RegisterFormStep1, RegisterFormStep2, RegisterFormStep3 } from '@/components/auth'

const FORM_STEP_1_HEIGHT = 392
const FORM_STEP_2_HEIGHT = 320
const FORM_STEP_3_HEIGHT = 400
const EXTRA_KEYBOARD_OFFSET = 180

const RegisterScreen = (): JSX.Element => {
  const theme = useTheme()

  const [key, setKey] = useState(0)
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [values, setValues] = useState<IRequestRegister>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  // @ts-ignore
  const pagerRef = useRef<PagerView>(null)
  const animatedImageRef = useRef(new Animated.Value(screenUtils.height - FORM_STEP_1_HEIGHT)).current

  useEffect(() => {
    if (key === 0) {
      Animated.timing(animatedImageRef, {
        toValue: keyboardVisible
          ? screenUtils.height - FORM_STEP_1_HEIGHT - EXTRA_KEYBOARD_OFFSET
          : screenUtils.height - FORM_STEP_1_HEIGHT,
        duration: 250,
        useNativeDriver: false,
      }).start()
    }
    if (key === 1) {
      Animated.timing(animatedImageRef, {
        toValue: keyboardVisible
          ? screenUtils.height - FORM_STEP_2_HEIGHT - EXTRA_KEYBOARD_OFFSET
          : screenUtils.height - FORM_STEP_2_HEIGHT,
        duration: 250,
        useNativeDriver: false,
      }).start()
    }

    if (key === 2) {
      Animated.timing(animatedImageRef, {
        toValue: keyboardVisible
          ? screenUtils.height - FORM_STEP_3_HEIGHT - EXTRA_KEYBOARD_OFFSET
          : screenUtils.height - FORM_STEP_3_HEIGHT,
        duration: 250,
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

  // prettier-ignore
  const onSubmitStep1 = useCallback((name: string) => {
    setValues({ ...values, name })
    pagerRef?.current?.setPage(1)
    setKey(1)
  },
  [pagerRef.current, values, key])

  // prettier-ignore
  const onSubmitStep2 = useCallback((email: string) => {
    setValues({ ...values, email })
    pagerRef?.current?.setPage(2)
    setKey(2)
  },
  [pagerRef.current, values, key])

  // prettier-ignore
  const onPressBack = useCallback((targetKey: number) => {
    pagerRef?.current?.setPage(targetKey)
    setKey(targetKey)
  },
  [pagerRef.current, key])

  log.warn(`values-> ${JSON.stringify(values)}`)

  return (
    <>
      <StatusBar translucent barStyle='light-content' />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
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
            <View key='1'>{key === 0 && <RegisterFormStep1 onSubmit={onSubmitStep1} value={values.name} />}</View>
            <View key='2'>
              {key === 1 && (
                <RegisterFormStep2
                  onSubmit={onSubmitStep2}
                  onPressBack={() => onPressBack(0)}
                  name={values.name}
                  value={values.email}
                />
              )}
            </View>
            <View key='3'>{key === 2 && <RegisterFormStep3 onSubmit={onSubmitStep2} onPressBack={() => onPressBack(1)} />}</View>
          </PagerView>
        </View>
      </ScrollView>
    </>
  )
}

const SHAPE_RADIUS = 22

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderTopRightRadius: SHAPE_RADIUS,
    borderTopLeftRadius: SHAPE_RADIUS,
    marginTop: -SHAPE_RADIUS,
  },
  pagerView: {
    flex: 1,
  },
})

export default RegisterScreen
