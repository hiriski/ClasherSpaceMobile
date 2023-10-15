import React, { FC, createContext, PropsWithChildren, useReducer, Dispatch } from 'react'

// reducers
import { AppReducerActions, appReducer } from '@/reducers'

// type for our context

export interface IAppState {
  splashScreenVisible: boolean
  foo: string
}

// app context provider
export const AppContext = createContext<IAppState>({} as IAppState)

// app dispatch provider
export const AppDispatchContext = createContext<Dispatch<AppReducerActions>>(null as unknown as Dispatch<AppReducerActions>)

/**
 * initial state
 */
export const appContext_initialState: IAppState = {
  splashScreenVisible: true,
  foo: 'Hello',
}

// app context provider
export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appContext_initialState)
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}
