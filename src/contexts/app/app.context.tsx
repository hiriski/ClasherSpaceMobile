import React, { FC, createContext, PropsWithChildren, useReducer, Dispatch } from 'react'

// reducers
import { AppReducerActions, appReducer } from '@/reducers'
import { AppLanguageCode } from '@/interfaces'
import { appConfig } from '@/config'

// type for our context

export interface IAppState {
  splashScreenVisible: boolean
  visibleBottomTab: boolean
  app_isAlreadyLaunched: boolean
  lang: AppLanguageCode
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
  visibleBottomTab: true,
  app_isAlreadyLaunched: false,
  lang: appConfig.defaultLang as AppLanguageCode,
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
