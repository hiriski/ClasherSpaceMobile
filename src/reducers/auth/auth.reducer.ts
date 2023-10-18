import { IAuthState, authContext_initialState } from '@/contexts/auth'
import { log } from '@/helpers'

export enum AuthActionTypes {
  setUser = '@auth/setUser',
  resetAuth = '@auth/resetAuth',
  loginLoading = '@auth/loginLoading',
  registerLoading = '@auth/registerLoading',
}

/**
 * ----------------------------------
 * Safely type for our reducer :)
 */
type SetUser = {
  type: AuthActionTypes.setUser
  payload: IAuthState['user']
}

type ResetAuth = {
  type: AuthActionTypes.resetAuth
}

type SetLoginLoading = {
  type: AuthActionTypes.loginLoading
  payload: boolean
}

type SetRegisterLoading = {
  type: AuthActionTypes.registerLoading
  payload: boolean
}

/** ---------------------------------- */

export type AuthReducerActions = SetUser | ResetAuth | SetLoginLoading | SetRegisterLoading

/**
 * app reducer
 * @param state IAuthState
 * @param action AuthReducerActions
 */
export const authReducer = (state: IAuthState, action: AuthReducerActions): IAuthState => {
  const { type } = action
  switch (type) {
    case AuthActionTypes.setUser:
      return {
        ...state,
        user: action.payload,
      }
    case AuthActionTypes.loginLoading:
      return {
        ...state,
        loginLoading: action.payload,
      }
    case AuthActionTypes.registerLoading:
      return {
        ...state,
        registerLoading: action.payload,
      }
    case AuthActionTypes.resetAuth:
      return authContext_initialState
    default:
      return state
  }
}
