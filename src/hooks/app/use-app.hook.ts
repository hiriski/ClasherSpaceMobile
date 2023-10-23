import { useContext } from 'react'

// context
import { AppContext, AppDispatchContext } from '@/contexts/app'

// action type
import { AppActionTypes } from '@/reducers'
import { AppLanguageCode } from '@/interfaces'
import { storageUtils } from '@/utilities'
import { useTranslation } from 'react-i18next'

export const useApp = () => {
  const state = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)

  const { i18n } = useTranslation()

  const setSplashScreen = (payload: boolean) => {
    dispatch({ type: AppActionTypes.setVisibleSplashScreen, payload })
  }

  const setVisibleBottomTab = (payload: boolean) => {
    dispatch({ type: AppActionTypes.setVisibleBottomTab, payload })
  }

  const app_setLang = (payload: AppLanguageCode) => {
    dispatch({ type: AppActionTypes.setLang, payload })
    i18n.changeLanguage(payload)
    // save it to storage
    storageUtils.saveString('LANGUAGE', payload)
  }

  return {
    ...state,
    setVisibleBottomTab,
    setSplashScreen,
    app_setLang,
  }
}
