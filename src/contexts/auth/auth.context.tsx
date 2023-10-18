import React, { FC, createContext, PropsWithChildren, useReducer, Dispatch } from 'react'

// reducers
import { AuthReducerActions, authReducer } from '@/reducers'

// interfaces
import { IUser } from '@/interfaces'

// type for our context
export interface IAuthState {
  user: IUser | null
  loginLoading: boolean
  registerLoading: boolean
}

// auth context provider
export const AuthContext = createContext<IAuthState>({} as IAuthState)

// auth dispatch provider
export const AuthDispatchContext = createContext<Dispatch<AuthReducerActions>>(null as unknown as Dispatch<AuthReducerActions>)

/**
 * initial state
 */
export const authContext_initialState: IAuthState = {
  user: null,
  loginLoading: false,
  registerLoading: false,
}

// auth context provider
export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authContext_initialState)
  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}
