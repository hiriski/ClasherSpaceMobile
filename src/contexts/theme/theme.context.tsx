import React, { FC, createContext, PropsWithChildren, useReducer, Dispatch } from 'react'

// reducers
import { ITheme } from '@/interfaces'
import { ThemeReducerActions, themeReducer } from '@/reducers/theme'

// helpers / utils
import { themeHelpers } from '@/helpers/theme.helper'
import { useColorScheme } from 'react-native'

// type for our context
export interface IThemeState extends ITheme {}

// theme context provider
export const ThemeContext = createContext<IThemeState>({} as IThemeState)

// theme dispatch provider
export const ThemeDispatchContext = createContext<Dispatch<ThemeReducerActions>>(null as unknown as Dispatch<ThemeReducerActions>)

/**
 * initial state
 */
export const themeContext_initialState: IThemeState = {} as IThemeState // that's find we will set up later

// theme context provider
export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const userPrefersColorScheme = useColorScheme() ?? 'light'
  const theme = themeHelpers.createTheme(userPrefersColorScheme)
  const [state, dispatch] = useReducer(themeReducer, theme)

  return (
    <ThemeContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  )
}
