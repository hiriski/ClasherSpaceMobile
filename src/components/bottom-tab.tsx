import { FC, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native'

// components
import { Icon } from '@/components/core'

// hooks
import { useApp } from '@/hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// interfaces
import { RNVectorIconProvider } from '@/interfaces'
import { NavigatorParamList } from '@/navigators/navigation.type'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

// utils
import { screenUtils } from '@/utilities'

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

const TAB_WIDTH = 180
const TAB_HEIGH = 58

interface Props extends BottomTabBarProps {}

const BottomTab: FC<Props> = props => {
  const { state, navigation } = props

  const insets = useSafeAreaInsets()

  const { visibleBottomTab } = useApp()

  const animatedBottomTabRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visibleBottomTab) {
      Animated.timing(animatedBottomTabRef, {
        toValue: 0,
        duration: 425,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedBottomTabRef, {
        toValue: 160,
        duration: 425,
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
        bottom: insets.bottom + 24,
        width: TAB_WIDTH,
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
        style={StyleSheet.flatten([
          styles.bottomTabRoot,
          { width: TAB_WIDTH },
          {
            // backgroundColor: theme.palette.background.paper,
          },
        ])}
      >
        <View style={StyleSheet.flatten([styles.customTab_root])}>
          {TAB_ITEMS.map((x, index) => (
            <TouchableOpacity key={x.path} activeOpacity={0.4} onPress={() => onPress(x.path)}>
              <View
                style={StyleSheet.flatten([
                  styles.tabItem,
                  {
                    ...(state.index === index && {
                      borderRadius: 60,
                      backgroundColor: '#fbfbfb',
                    }),
                  },
                ])}
              >
                <Icon
                  size={23}
                  name={state.index === index ? x.focusIcon : x.icon}
                  provider={x.iconProvider}
                  color={state.index === index ? '#337FFF' : '#ffffff'}
                />
                {/* {state.index === index && (
                  <View style={{ marginLeft: createSpacing(2) }}>
                    <Typography variant='body2'>{x.label}</Typography>
                  </View>
                )} */}
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
    borderRadius: TAB_HEIGH,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_HEIGH,
    backgroundColor: '#337FFF',
    flexDirection: 'row',
  },
  tabItem: {
    height: TAB_HEIGH - 12,
    width: TAB_WIDTH / 3 - 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BottomTab
