import { FC, useEffect, useRef } from 'react'
import { View, Animated, StyleSheet, Pressable } from 'react-native'

// components
import { Typography } from '@/components/core'

// hooks
import { useApp, useTheme } from '@/hooks'

// interfaces
import { BottomTabNavigatorParamList, NavigatorParamList } from '@/navigators/navigation.type'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

// utils
import { screenUtils } from '@/utilities'
import { createSpacing } from '@/helpers'
import { useAuth } from '@/hooks/auth'
import { themeConfig } from '@/config'

// fast image
import FastImage from 'react-native-fast-image'

// assets
import { AssetsAvatars } from '@/assets/avatars'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeIcon from '@/assets/svg/home-smile-angle-bold-duotone.svg'
import LayerIcon from '@/assets/svg/layers-bold-duotone.svg'
import UserIcon from '@/assets/svg/user-bold-duotone.svg'

type TabItem = {
  path: keyof BottomTabNavigatorParamList
  label: string
  icon: any
  focusIcon: any
}

const ICON_SIZE = 24

const TAB_ITEMS: Array<TabItem> = [
  {
    path: 'dashboard_screen',
    label: 'Home',
    icon: <HomeIcon color={themeConfig.paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <HomeIcon color='#ffffff' height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    path: 'layout_list_screen',
    label: 'Base',
    icon: <LayerIcon color={themeConfig.paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <LayerIcon color='#ffffff' height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    path: 'profile_screen',
    label: 'Profile',
    icon: <UserIcon color={themeConfig.paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <UserIcon color='#ffffff' height={ICON_SIZE} width={ICON_SIZE} />,
  },
]
const TAB_WIDTH = screenUtils.width
const TAB_HEIGH = 68

interface Props extends BottomTabBarProps {}

const BottomTab: FC<Props> = props => {
  const { state, navigation } = props

  const insets = useSafeAreaInsets()

  const { isAuthenticated, user } = useAuth()

  const theme = useTheme()

  const { visibleBottomTab } = useApp()

  const animatedBottomTabRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visibleBottomTab) {
      Animated.timing(animatedBottomTabRef, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedBottomTabRef, {
        toValue: TAB_HEIGH + 62,
        duration: 250,
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
        bottom: 0,
        width: TAB_WIDTH,
        backgroundColor: theme.palette.background.paper,
        borderTopColor: theme.palette.divider,
        borderTopWidth: 1.2,
        paddingBottom: insets.bottom,
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
      <View
        style={StyleSheet.flatten([styles.bottomTabRoot, { width: TAB_WIDTH, backgroundColor: theme.palette.background.paper }])}
      >
        <View style={StyleSheet.flatten([styles.customTab_root])}>
          {TAB_ITEMS.map((x, index) => (
            <Pressable
              key={x.path}
              onPress={() => onPress(x.path)}
              style={({ pressed }) =>
                StyleSheet.flatten([
                  styles.tabItem,
                  {
                    ...(state.index === index && styles.tabItemFocused),
                    ...(pressed && {
                      backgroundColor: state.index !== index ? theme.palette.primary.light : undefined,
                    }),
                  },
                ])
              }
            >
              <View style={StyleSheet.flatten([styles.tabItemInner])}>
                {isAuthenticated && user?.photoUrl && x.path === 'profile_screen' ? (
                  <FastImage
                    style={StyleSheet.flatten([styles.tabBarAvatar])}
                    defaultSource={AssetsAvatars.avatarGuest}
                    source={{
                      uri: user?.photoUrl as string,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : state.index === index ? (
                  x.focusIcon
                ) : (
                  x.icon
                )}

                <View style={StyleSheet.flatten([{ marginLeft: createSpacing(2) }])}>
                  <Typography
                    variant='body2'
                    style={StyleSheet.flatten([
                      styles.tabItemLabel,
                      {
                        ...(state.index === index
                          ? { color: theme.palette.common.white }
                          : { color: theme.palette.text.secondary }),
                      },
                    ])}
                  >
                    {x.label}
                  </Typography>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  customTab_root: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
  },
  bottomTabRoot: {
    elevation: 8,
    shadowColor: 'rgba(0,0,0,0.65)',
    shadowOpacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_HEIGH,
    flexDirection: 'row',
  },
  tabItem: {
    height: TAB_HEIGH - 24,
    width: TAB_WIDTH / 3 - 22,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  tabItemFocused: {
    backgroundColor: '#337FFF',
  },
  tabItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemLabel: {
    fontWeight: 'bold',
  },
  tabBarAvatar: {
    width: 22,
    height: 22,
    borderRadius: 22,
  },
})

export default BottomTab
