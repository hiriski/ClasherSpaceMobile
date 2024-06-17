import { View, ScrollView, Animated, Keyboard } from 'react-native'
import { Spinner, StatusBar } from '@/components/core'
import { useTheme, useToast } from '@/hooks'
import { Assets } from '@/assets'
import { StyleSheet } from 'react-native'
import { platformUtils, screenUtils } from '@/utilities'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'
import { IRequestRegister } from '@/api'
import { useAuth } from '@/hooks/auth'
import { useAppDispatch } from '@/store'
import { useFocusEffect } from '@react-navigation/native'
import { IUnprocessableEntity } from '@/interfaces/http.interface'
import { useNavigation } from '@/navigator'
import { RegisterFormStep1, RegisterFormStep2, RegisterFormStep3 } from '@/components/auth'

const FORM_STEP_1_HEIGHT = 510
const FORM_STEP_2_HEIGHT = 346
const FORM_STEP_3_HEIGHT = 460
const EXTRA_KEYBOARD_OFFSET = platformUtils.isIOS ? 300 : 180

type FormValuesStep3 = {
  password: string
  password_confirmation: string
}

const initialValues = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const RegisterScreen = (): JSX.Element => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const { auth_registerWithEmailAndPassword } = useAuth()

  const [key, setKey] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const [values, setValues] = useState<IRequestRegister>(initialValues)

  const navigation = useNavigation()

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

  },
  [pagerRef.current, values])

  // prettier-ignore
  const onSubmitStep2 = useCallback((email: string) => {
    setValues({ ...values, email })
    pagerRef?.current?.setPage(2)
  },
  [pagerRef.current, values])

  // prettier-ignore
  const onPressBack = useCallback((targetKey: number) => {
    pagerRef?.current?.setPage(targetKey)
  },
  [pagerRef.current])

  const handleSubmit = useCallback(
    (passValues: FormValuesStep3) => {
      setIsLoading(true)

      const submitValues = {
        ...values,
        ...passValues,
      }

      setValues(submitValues)

      dispatch(auth_registerWithEmailAndPassword(submitValues))
        .then(result => {
          if (result.meta.requestStatus === 'fulfilled') {
            navigation.navigate('profile_screen')
          } else if (result.meta.requestStatus === 'rejected') {
            let toastTitle = 'Register failed'
            // @ts-ignore
            const httpResponse: IUnprocessableEntity = result.payload
            if (httpResponse.message) {
              toastTitle = httpResponse.message
            }
            showToast({
              type: 'error',
              position: 'bottom',
              variant: 'filled',
              text1: toastTitle,
            })
          }
        })
        .catch()
        .finally(() => {
          setIsLoading(false)
        })
    },
    [values]
  )

  useFocusEffect(
    useCallback(() => {
      setValues(initialValues)
    }, [])
  )

  // log.warn(`appConfig-> ${JSON.stringify(appConfig.apiBaseUrl)}`)

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'
      bounces={false}
    >
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
        {/* @ts-ignore */}
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          orientation='horizontal'
          initialPage={0}
          scrollEnabled={false}
          onPageSelected={({ nativeEvent }) => setKey(nativeEvent.position)}
        >
          <View key='1' style={styles.pagerViewItem}>
            {key === 0 && <RegisterFormStep1 onSubmit={onSubmitStep1} defaultValue={values.name} />}
          </View>
          <View key='2' style={styles.pagerViewItem}>
            {key === 1 && (
              <RegisterFormStep2
                onSubmit={onSubmitStep2}
                onPressBack={() => onPressBack(0)}
                name={values.name}
                defaultValue={values.email}
              />
            )}
          </View>
          <View key='3' style={styles.pagerViewItem}>
            {isLoading ? (
              <View style={{ alignItems: 'center', justifyContent: 'center', height: FORM_STEP_3_HEIGHT - 50 }}>
                <Spinner />
              </View>
            ) : (
              <Fragment>
                {key === 2 && (
                  <RegisterFormStep3
                    onSubmit={handleSubmit}
                    onPressBack={() => onPressBack(1)}
                    defaultValue={{
                      password: values.password,
                      password_confirmation: values.password_confirmation,
                    }}
                  />
                )}
              </Fragment>
            )}
          </View>
        </PagerView>
      </View>
    </ScrollView>
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
  pagerViewItem: {
    flex: 1,
    width: screenUtils.width,
  },
})

export default RegisterScreen
