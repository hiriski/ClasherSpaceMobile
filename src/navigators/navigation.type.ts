import { ComponentType } from 'react'
import { NativeStackNavigationOptions, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

export type NavigatorParamList = {
  splash_screen: undefined
  onboarding_screen: undefined
  bottom_tab_stack: undefined
  layout_list_screen: undefined
  layout_detail_screen: undefined
  notifications_screen: undefined
  register_screen: undefined
  login_screen: undefined
} & BottomTabNavigatorParamList

export type BottomTabNavigatorParamList = {
  dashboard_screen: undefined
  layout_list_screen: undefined
  profile_screen: undefined
}

export type ScreenType = {
  label?: string | null
  name: keyof Partial<NavigatorParamList>
  component: ComponentType<object> | (() => JSX.Element)
  options?: NativeStackNavigationOptions
}

export type NavigationProps = NativeStackNavigationProp<Partial<NavigatorParamList>>

export type AppStackScreenProps<T extends keyof NavigatorParamList> = NativeStackScreenProps<NavigatorParamList, T>
