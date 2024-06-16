import { View } from 'react-native'

// components
import { Screen, Typography } from '@/components/core'

// hooks
import { useTheme } from '@/hooks'

const VideoScreen = (): JSX.Element => {
  const theme = useTheme()

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      backgroundColor={'#ECECEC'}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography color='text.disabled' style={{ textAlign: 'center' }} gutterBottom={2}>
          Video Screen
        </Typography>
      </View>
    </Screen>
  )
}

export default VideoScreen
