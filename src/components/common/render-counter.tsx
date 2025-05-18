import { FC, memo } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const RenderCounter: FC<{ renderCount: number }> = ({ renderCount }) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        position: 'absolute',
        bottom: insets.bottom,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF4830',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 9999,
      }}
    >
      <Text style={{ fontWeight: 500, fontFamily: 'Jost', fontSize: 12, color: '#ffffff' }}>Renders: </Text>
      <Text style={{ fontWeight: 600, fontFamily: 'Jost', fontSize: 12, color: '#ffffff' }}>({renderCount})</Text>
    </View>
  )
}

export default memo(RenderCounter)
