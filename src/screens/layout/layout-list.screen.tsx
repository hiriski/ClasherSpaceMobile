import { View } from 'react-native'
import { Screen, Typography } from '@/components/core'
import { paletteLibs } from '@/libs/palette/_palette.lib'
import { useTheme } from '@/hooks'

const LayoutListScreen = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      title='Layout List Screen'
      titleColor='#ffffff'
      headerBackgroundColor={paletteLibs.grey[800]}
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}
    >
      <View style={{ flex: 1 }}>
        <Typography color='text.disabled' style={{ textAlign: 'center' }}>
          Layout list
        </Typography>
      </View>
    </Screen>
  )
}

export default LayoutListScreen
