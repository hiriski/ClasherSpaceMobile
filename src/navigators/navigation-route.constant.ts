import { ScreenType } from './navigation.type'

// screens
import { SplashScreen } from '@/screens/splash'
import { DashboardScreen } from '@/screens/dashboard'

export const NavigationRoutes: Array<ScreenType> = [
  {
    name: 'splash_screen',
    label: null,
    component: SplashScreen,
  },
  {
    name: 'dashboard_screen',
    label: 'Dashboard',
    component: DashboardScreen,
  },
]
