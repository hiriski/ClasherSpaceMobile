import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// components
import BottomTab from '@/components/bottom-tab'

// screens
import { DashboardScreen } from '@/screens/dashboard'
import { BaseLayoutListScreen } from '@/screens/base-layout'
import { ProfileScreen } from '@/screens/profile'
import VideoScreen from '@/screens/video/video.screen'

// interfaces
import { ScreenType } from './navigation.type'
import { JSX } from 'react'

// screens list
export const bottomTabScreens: ScreenType[] = [
  {
    name: 'dashboard_screen',
    label: 'Dashboard',
    component: DashboardScreen,
  },
  {
    name: 'base_layout_list_screen',
    label: 'Layouts',
    component: BaseLayoutListScreen,
  },
  {
    name: 'video_screen',
    label: 'Stream',
    component: VideoScreen,
  },
  {
    name: 'profile_screen',
    label: 'Profile',
    component: ProfileScreen,
  },
]

const BottomTabStack = createBottomTabNavigator()

const BottomTabStackNavigator = (): JSX.Element | null => {
  const renderTabBar = (props: BottomTabBarProps) => <BottomTab {...props} />
  return (
    <BottomTabStack.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      {bottomTabScreens.map(x => {
        return <BottomTabStack.Screen key={x.name} component={x.component} name={x.name} />
      })}
    </BottomTabStack.Navigator>
  )
}

export default BottomTabStackNavigator
