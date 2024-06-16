import { FC, ReactElement, useEffect, useRef } from 'react'
import { View, Animated, StyleSheet, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// hooks
import { useApp, useTheme } from '@/hooks'

// interfaces
import { BottomTabNavigatorParamList, NavigatorParamList } from '@/navigator/navigation.type'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

// utils
import { screenUtils } from '@/utilities'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Assets } from '@/assets'
import { themeConfig, theme_paletteBase, theme_paletteLight } from '@/configs'

type TabItem = {
  path: keyof BottomTabNavigatorParamList
  label: string
  icon: ReactElement
  focusIcon: ReactElement
}

const ICON_SIZE = 26
const TAB_WIDTH = screenUtils.width - 110
const TAB_HEIGHT = 64
const TAB_ITEM_SIZE = 50

const TAB_ITEMS: Array<TabItem> = [
  {
    path: 'dashboard_screen',
    label: 'Home',
    icon: <Assets.SVGWidgetDuoToneIcon color={theme_paletteLight.text.secondary} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <Assets.SVGWidgetDuoToneIcon color={theme_paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    path: 'layout_list_screen',
    label: 'Layouts',
    icon: <Assets.SVGLayersDuoToneIcon color={theme_paletteLight.text.secondary} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <Assets.SVGLayersDuoToneIcon color={theme_paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    path: 'video_screen',
    label: 'Stream',
    icon: <Assets.SVGVideoDuoToneIcon color={theme_paletteLight.text.secondary} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <Assets.SVGVideoDuoToneIcon color={theme_paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    path: 'profile_screen',
    label: 'Profile',
    icon: <Assets.SVGUserDuoToneIcon color={theme_paletteLight.text.secondary} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <Assets.SVGUserDuoToneIcon color={theme_paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
  },
]

interface Props extends BottomTabBarProps {}

const BottomTab: FC<Props> = props => {
  const { state, navigation } = props
  const insets = useSafeAreaInsets()

  const TAB_SPACING_BOTTOM = insets.bottom + 6

  const { visibleBottomTab } = useApp()

  const animatedBottomTabRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visibleBottomTab) {
      Animated.timing(animatedBottomTabRef, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedBottomTabRef, {
        toValue: TAB_HEIGHT + TAB_SPACING_BOTTOM,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [visibleBottomTab])

  const onPress = (routeName: keyof NavigatorParamList) => {
    navigation.navigate(routeName)
  }

  return (
    <Animated.View
      style={{
        left: 0,
        right: 0,
        position: 'absolute',
        bottom: TAB_SPACING_BOTTOM,
        width: TAB_WIDTH,
        height: TAB_HEIGHT,
        transform: [
          {
            translateY: animatedBottomTabRef,
          },
          {
            translateX: screenUtils.width / 2 - TAB_WIDTH / 2,
          },
        ],
      }}
    >
      <LinearGradient
        colors={['#ADC8FF', '#DFF8A2', '#FFE9B3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderWidth: 2,
          borderColor: '#FFFFFF',
          height: TAB_HEIGHT,
          width: TAB_WIDTH + 14,
          position: 'absolute',
          left: -7,
          bottom: 0,
          borderRadius: TAB_HEIGHT,
          elevation: 8,
          shadowColor: 'rgba(0,0,0,0.35)',
          shadowOpacity: 0.2,
          alignItems: 'center',
          opacity: 0.5,
        }}
      />
      <View style={styles.tab_root}>
        {TAB_ITEMS.map((x, index) => (
          <View style={styles.tabItem_root}>
            <Pressable
              key={x.path}
              onPress={() => onPress(x.path)}
              disabled={state.index === index}
              // style={StyleSheet.flatten([styles.tabItem, { ...(state.index === index && styles.tabItemFocused) }])}
              style={StyleSheet.flatten([styles.tabItem])}
            >
              {state.index === index ? x.focusIcon : x.icon}
            </Pressable>
          </View>
        ))}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  tab_root: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: TAB_HEIGHT,
  },
  tabItem_root: {
    height: TAB_ITEM_SIZE,
    width: TAB_WIDTH / TAB_ITEMS.length,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    height: TAB_ITEM_SIZE,
    width: TAB_ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TAB_ITEM_SIZE,
  },
  tabItemFocused: {
    backgroundColor: themeConfig.paletteBase.primary.main,
  },
})

export default BottomTab
