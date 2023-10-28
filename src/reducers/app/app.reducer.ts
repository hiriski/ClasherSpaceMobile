import { IAppState } from '@/contexts/app'
import { AppLanguageCode } from '@/interfaces'

export enum AppActionTypes {
  setVisibleSplashScreen = '@app/setVisibleSplashScreen',
  setVisibleBottomTab = '@app/setVisibleBottomTab',
  setLang = '@app/setLang',
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

type SetLang = {
  type: AppActionTypes.setLang
  payload: AppLanguageCode
}
/** ---------------------------------- */

export type AppReducerActions = SetVisibleSplashScreen | SetVisibleBottomTab | SetLang

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
    case AppActionTypes.setLang:
      return {
        ...state,
        lang: payload,
      }
    default:
      return state
  }
}
