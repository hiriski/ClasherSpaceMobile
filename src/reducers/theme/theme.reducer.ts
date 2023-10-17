// interfaces
import { IThemeState } from '@/contexts/theme'
import { PaletteMode } from '@/interfaces'

export enum ThemeActionTypes {
  setPaletteMode = '@theme/setPaletteMode',
  togglePaletteMode = '@theme/togglePaletteMode',
}

/**
 * ----------------------------------
 * Safely type for our reducer :)
 */
type SetPaletteMode = {
  type: ThemeActionTypes.setPaletteMode
  payload: PaletteMode
}

type TogglePaletteMode = {
  type: ThemeActionTypes.togglePaletteMode
}

/** ---------------------------------- */

export type ThemeReducerActions = SetPaletteMode | TogglePaletteMode

/**
 * app reducer
 * @param state IThemeState
 * @param action ThemeReducerActions
 */
export const themeReducer = (state: IThemeState, action: ThemeReducerActions): IThemeState => {
  const { type } = action
  switch (type) {
    case ThemeActionTypes.setPaletteMode:
      return {
        ...state,
        palette: {
          ...state.palette,
          mode: action.payload,
        },
      }
    case ThemeActionTypes.togglePaletteMode:
      return {
        ...state,
        palette: {
          ...state.palette,
          mode: state.palette.mode === 'dark' ? 'light' : 'dark',
        },
      }
    // add another actions
    default:
      return state
  }
}
