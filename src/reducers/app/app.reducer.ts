import { IAppState } from '@/contexts/app'

export enum AppActionTypes {
  setVisibleSplashScreen = '@app/setVisibleSplashScreen',
  setFoo = '@app/setFoo',
}

/**
 * ----------------------------------
 * Safely type for our reducer :)
 */
type SetVisibleSplashScreen = {
  type: AppActionTypes.setVisibleSplashScreen
  payload: boolean
}

type SetFoo = {
  type: AppActionTypes.setFoo
  payload: string
}
/** ---------------------------------- */

export type AppReducerActions = SetVisibleSplashScreen | SetFoo

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
    case AppActionTypes.setFoo:
      return {
        ...state,
        foo: payload,
      }
    default:
      return state
  }
}
