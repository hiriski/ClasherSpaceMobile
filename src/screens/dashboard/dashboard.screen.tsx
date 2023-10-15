import { Dimensions, StyleSheet, Text, View } from 'react-native'

const DashboardScreen = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <Text>Dashboard screen</Text>
    </View>
  )
}

const dimensions = Dimensions.get('window')

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.width,
    height: dimensions.height,
  },
})

export default DashboardScreen
