import { IAppState } from '@/contexts/app'

export enum AppActionTypes {
  setVisibleSplashScreen = '@app/setVisibleSplashScreen',
  setVisibleBottomTab = '@app/setVisibleBottomTab',
}

/**
 * ----------------------------------
 * Safely type for our reducer :)
 */
type SetVisibleSplashScreen = {
  type: AppActionTypes.setVisibleSplashScreen
  payload: boolean
}

type SetVisibleBottomTab = {
  type: AppActionTypes.setVisibleBottomTab
  payload: boolean
}
/** ---------------------------------- */

export type AppReducerActions = SetVisibleSplashScreen | SetVisibleBottomTab

/**
 * app reducer
 * @param state IAppState
 * @param action AppReducerActions
 */
export const appReducer = (state: IAppState, action: AppReducerActions): IAppState => {
  const { type, payload } = action
  switch (type) {
    case AppActionTypes.setVisibleSplashScreen:
      return {
        ...state,
        splashScreenVisible: payload,
      }
    case AppActionTypes.setVisibleBottomTab:
      return {
        ...state,
        visibleBottomTab: payload,
      }
    default:
      return state
  }
}
