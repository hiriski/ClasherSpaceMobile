// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// i18n
// import i18n from 'i18next'

// app config
import { RootState } from '@/store'
import { AppLanguageCode } from '@/interfaces'

// type for our state
export type AppPersistedSlice = {
  lang: AppLanguageCode
}

// initial state
export const appPersisted_initialState: AppPersistedSlice = {
  lang: 'en',
}

export const appPersistedSlice = createSlice({
  name: 'app.persisted',
  initialState: appPersisted_initialState,
  reducers: {
    appPersisted_setSetLang(state, action: PayloadAction<AppLanguageCode>) {
      state.lang = action.payload
    },
  },
})

export const appPersisted_reducerActions = appPersistedSlice.actions

export const appPersisted_selector = (state: RootState): AppPersistedSlice => state['app.persisted']
