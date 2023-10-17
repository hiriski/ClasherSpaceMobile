import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native'

// react navigation
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NavigatorParamList, ScreenType } from './navigation.type'

// components
import { Ionicon, Typography } from '@/components/core'

// drop shadow
import DropShadow from 'react-native-drop-shadow'

// screens
import { DashboardScreen } from '@/screens/dashboard'
import { ProfileScreen } from '@/screens/profile'
import { SettingsScreen } from '@/screens/settings'
import { useApp, useTheme } from '@/hooks'
import { ReactNode, useEffect, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import { createSpacing } from '@/helpers'
import { platformUtils } from '@/utilities'
import { themeConfig } from '@/config'
import { paletteLibs } from '@/libs/palette/_palette.lib'

// screens list
export const BOTTOM_TAB_SCREENS: ScreenType[] = [
  {
    name: 'dashboard_screen',
    label: 'Dashboard',
    component: DashboardScreen,
  },
  {
    name: 'profile_screen',
    label: 'Profile',
    component: ProfileScreen,
  },
  {
    name: 'settings_screen',
    label: 'Settings',
    component: SettingsScreen,
  },
]

const BottomTabStack = createBottomTabNavigator()

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Typography style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Typography>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const BottomTabStackNavigator = (): JSX.Element | null => {
  const theme = useTheme()

  const { visibleBottomTab } = useApp()

  const animatedBottomTabRef = useRef(new Animated.Value(0)).current

  const route = useRoute()

  // const AnimateResult = () => {
  //   Animated.timing(animatedBottomTabRef, {
  //     toValue: 1,
  //     duration: 3000,
  //     useNativeDriver: false,
  //   }).start();
  // };

  useEffect(() => {
    if (visibleBottomTab) {
      Animated.timing(animatedBottomTabRef, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedBottomTabRef, {
        toValue: 1000,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }, [visibleBottomTab])

  const renderCustomTab = ({ state, descriptors, navigation }: BottomTabBarProps): ReactNode => {
    const onPress = (routeName: keyof NavigatorParamList) => {
      const isFocused = route.name === routeName
      // const event = navigation.emit({
      //   type: 'tabPress',
      //   target: target,
      //   canPreventDefault: true,
      // });

      if (!isFocused) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({ name: routeName, merge: true } as never)
      }
    }

    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 40,
          right: 0,
          transform: [
            {
              translateX: animatedBottomTabRef,
            },
          ],
        }}
      >
        <DropShadow style={styles.customTab_shadow}>
          <View
            style={StyleSheet.flatten([
              styles.customTab_root,
              {
                backgroundColor: theme.palette.background.paper,
                borderTopColor: theme.isDarkMode ? paletteLibs.grey[900] : 'transparent',
                borderTopLeftRadius: 90,
                borderBottomLeftRadius: 90,
              },
            ])}
          >
            {/* Custom button tab */}
            <TouchableOpacity activeOpacity={0.4} onPress={() => onPress('profile_screen')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 12,
                }}
              >
                <Ionicon name='person-circle-sharp' size={28} />
                {/* <UserAvatar user={user} size={44} /> */}
                <View style={{ marginLeft: createSpacing(3) }}>
                  <Typography variant='h5'>User</Typography>
                  <Typography variant='subtitle2'>-</Typography>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </DropShadow>
      </Animated.View>
    )
  }

  return (
    <BottomTabStack.Navigator screenOptions={{ headerShown: false }} tabBar={renderCustomTab}>
      {BOTTOM_TAB_SCREENS.map(x => {
        return <BottomTabStack.Screen key={x.name} component={x.component} name={x.name} />
      })}
    </BottomTabStack.Navigator>
  )
}
const AddOnTabItemWidth = 80

const styles = StyleSheet.create({
  customTab_root: {
    flexDirection: 'row',
    width: 'auto',
    paddingVertical: createSpacing(3),
    paddingHorizontal: createSpacing(3),
    alignItems: 'center',
  },
  customTab_shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  customTab_item: {
    flex: 1,
    alignItems: 'center',
    paddingTop: createSpacing(2),
    paddingBottom: platformUtils.isIOS ? createSpacing(6) : createSpacing(1),
  },
  customTab_itemProfileImage: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  customTab_addOnItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: platformUtils.isAndroid ? 0 : 40,
    borderTopLeftRadius: platformUtils.isIOS ? 40 : 20,
    height: '100%',
    width: AddOnTabItemWidth,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomSheet_root: {
    flex: 1,
  },
  bottomSheet_backgroundStyle: { borderRadius: themeConfig.shape.borderRadius * 3 },
  bottomSheet_handleIndicatorStyle: { height: 2, width: 32 },
  bottomSheet_content: {
    flex: 1,
    alignItems: 'center',
    marginTop: createSpacing(10),
  },
})

export default BottomTabStackNavigator
