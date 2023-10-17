import { useContext } from 'react'

// context
import { AppContext, AppDispatchContext } from '@/contexts/app'

// action type
import { AppActionTypes } from '@/reducers'

export const useApp = () => {
  const state = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)

  const setSplashScreen = (payload: boolean) => {
    dispatch({ type: AppActionTypes.setVisibleSplashScreen, payload })
  }

  const setVisibleBottomTab = (payload: boolean) => {
    dispatch({ type: AppActionTypes.setVisibleBottomTab, payload })
  }

  return {
    ...state,
    setVisibleBottomTab,
    setSplashScreen,
  }
}
