import { FC, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native'

// components
import { Icon, Typography } from '@/components/core'

// hooks
import { useApp, useTheme } from '@/hooks'

// interfaces
import { RNVectorIconProvider } from '@/interfaces'
import { NavigatorParamList } from '@/navigators/navigation.type'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

// utils
import { platformUtils, screenUtils } from '@/utilities'
import { createSpacing } from '@/helpers'
import { useAuth } from '@/hooks/auth'

// fast image
import FastImage from 'react-native-fast-image'

// assets
import { AssetsAvatars } from '@/assets/avatars'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TabItem = {
  path: keyof NavigatorParamList
  label: string
  icon: string
  focusIcon: string
  iconProvider: RNVectorIconProvider
}

const TAB_ITEMS: Array<TabItem> = [
  {
    path: 'dashboard_screen',
    label: 'Home',
    icon: 'layers-outline',
    focusIcon: 'layers',
    iconProvider: 'ionicons',
  },
  {
    path: 'layout_list_screen',
    label: 'Layouts',
    icon: 'map-outline',
    focusIcon: 'map',
    iconProvider: 'ionicons',
  },
  {
    path: 'profile_screen',
    label: 'Profile',
    icon: 'person-circle-outline',
    focusIcon: 'person-circle',
    iconProvider: 'ionicons',
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
      <View style={StyleSheet.flatten([styles.bottomTabRoot, { width: TAB_WIDTH }])}>
        <View style={StyleSheet.flatten([styles.customTab_root])}>
          {TAB_ITEMS.map((x, index) => (
            <TouchableOpacity
              key={x.path}
              activeOpacity={0.85}
              onPress={() => onPress(x.path)}
              style={StyleSheet.flatten([styles.tabItem, { ...(state.index === index && styles.tabItemFocused) }])}
            >
              <View style={StyleSheet.flatten([styles.tabItemInner])}>
                {isAuthenticated && user?.photoURL && x.path === 'profile_screen' ? (
                  <FastImage
                    style={StyleSheet.flatten([styles.tabBarAvatar])}
                    defaultSource={AssetsAvatars.avatarGuest}
                    source={{
                      uri: user?.photoURL as string,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <Icon
                    size={22}
                    name={state.index === index ? x.focusIcon : x.icon}
                    provider={x.iconProvider}
                    color={state.index === index ? '#ffffff' : '#337FFF'}
                  />
                )}
                {state.index === index && (
                  <View style={StyleSheet.flatten([{ marginLeft: createSpacing(2) }])}>
                    <Typography variant='body2' style={styles.tabItemLabel}>
                      {x.label}
                    </Typography>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
    height: TAB_HEIGH - 18,
    width: TAB_WIDTH / 3 - 10,
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
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tabBarAvatar: {
    width: 22,
    height: 22,
    borderRadius: 22,
  },
})

export default BottomTab
