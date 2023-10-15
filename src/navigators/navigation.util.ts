import { createNavigationContainerRef, NavigationAction, NavigationState, PartialState } from '@react-navigation/native'
import { NavigatorParamList } from './navigation.type'

export const RootNavigation = {
  navigate(_name: string, _params?: any) {},
  goBack() {},
  resetRoot(_state?: PartialState<NavigationState> | NavigationState) {},
  getRootState(): NavigationState {
    return {} as any
  },
  dispatch(_action: NavigationAction) {},
}

// prettier-ignore
export const navigationRef = createNavigationContainerRef<NavigatorParamList>()

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(state: NavigationState | PartialState<NavigationState>): string {
  const route = state.routes[state.index as number]

  // Found the active route -- return the name
  if (!route.state) {
    return route.name
  }

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state)
}

/**
 * use this to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * More info: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export function navigate(name: keyof Partial<NavigatorParamList>, params?: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name as never, params as never)
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack()
  }
}

export function resetRoot(
  params: PartialState<NavigationState> | NavigationState = {
    index: 0,
    routes: [],
  }
) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params)
  }
}

export const navigatorUtils = { navigate, goBack, resetRoot }
