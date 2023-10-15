import { appConfig } from '@/config'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const dimensions = Dimensions.get('window')
const AppSplashScreen = (): JSX.Element => {
  return (
    <>
      <StatusBar translucent />
      <View style={StyleSheet.flatten([styles.root])}>
        <View style={styles.root}>
          <Icon name='game-controller' size={64} color='#4674fe' style={{ marginBottom: 12 }} />
          <Text style={StyleSheet.flatten([styles.text, { fontSize: 22, fontWeight: '500', marginBottom: 4 }])}>
            {appConfig.appName}
          </Text>
          <Text style={styles.text}>{appConfig.appDescription}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Made with ❤️</Text>
        </View>
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
    width: dimensions.width,
    height: dimensions.height,
    zIndex: 1000,
    backgroundColor: '#ffffff',
  },
  text: {
    fontFamily: 'Jost',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 30,
    alignItems: 'center',
  },
})

export default AppSplashScreen
