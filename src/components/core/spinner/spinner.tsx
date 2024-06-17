import { FC, memo, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import LoadingLoop from '@/assets/svg/loading-loop.svg'
import { paletteLibs } from '@/libs/palette/_palette.lib'

interface Props {
  color?: string
  size?: number
}

const Spinner: FC<Props> = ({ color = paletteLibs.blue[600], size = 40 }) => {
  const spinValue = useRef(new Animated.Value(0)).current

  Animated.loop(
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ])
  ).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      style={{
        transform: [{ rotate: spin }],
      }}
    >
      <LoadingLoop height={size} width={size} color={color} />
    </Animated.View>
  )
}

export default memo(Spinner)
