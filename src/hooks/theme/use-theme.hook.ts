import { useContext } from 'react'

// context
import { ThemeContext, ThemeDispatchContext } from '@/contexts/theme'

// action type
import { ThemeActionTypes } from '@/reducers'
import { PaletteMode } from '@/interfaces'

export const useTheme = () => {
  const state = useContext(ThemeContext)
  const dispatch = useContext(ThemeDispatchContext)

  const isDarkMode = state.palette.mode === 'dark'

  const setPaletteMode = (payload: PaletteMode) => {
    dispatch({ type: ThemeActionTypes.setPaletteMode, payload })
  }

  const togglePaletteMode = () => {
    dispatch({ type: ThemeActionTypes.togglePaletteMode })
  }

  return {
    ...state,
    isDarkMode,
    setPaletteMode,
    togglePaletteMode,
  }
}
