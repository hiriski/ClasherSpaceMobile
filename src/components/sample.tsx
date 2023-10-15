import { useApp } from '@/hooks'
import { Button, Text, View } from 'react-native'

const Sample = () => {
  const { setSplashScreen, splashScreenVisible, setFoo } = useApp()

  return (
    <View>
      <Text style={{ fontSize: 24, fontFamily: 'Jost', fontWeight: '300' }}>Hi, i am custom font :)</Text>
      <Button title='Toggle splash' onPress={() => setSplashScreen(!splashScreenVisible)} />
      <Button title='Set Foo' onPress={() => setFoo("It's work like magic! ")} />
    </View>
  )
}

export default Sample
