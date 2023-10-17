import { View } from 'react-native'
import { Button, Screen, Typography } from '@/components/core'
import { paletteLibs } from '@/libs/palette/_palette.lib'
import { useTheme } from '@/hooks'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/navigators'

const DashboardScreen = (): JSX.Element => {
  const theme = useTheme()
  const nav = useNavigation<NavigationProps>()
  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      title='Settings'
      titleColor='#ffffff'
      headerBackgroundColor={paletteLibs.grey[800]}
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}
    >
      <View style={{ flex: 1 }}>
        <Typography color='text.disabled' style={{ textAlign: 'center' }}>
          Dashboard
        </Typography>
        <Button title='Navigate to layout list' onPress={() => nav.navigate('layout_list_screen')} />
      </View>
    </Screen>
  )
}

export default DashboardScreen
