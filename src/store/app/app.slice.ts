// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// i18n
// import i18n from 'i18next'

// app config
import { RootState } from '@/store'

// type for our state
export type AppSliceState = {
  visibleBottomTab: boolean
  openModalStreak: boolean
  snapIndexBottomSheetLevel: number
  isOffline: boolean
}

// initial state
export const app_initialState: AppSliceState = {
  visibleBottomTab: true,
  openModalStreak: false,
  snapIndexBottomSheetLevel: -1,
  isOffline: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState: app_initialState,
  reducers: {
    app_setVisibleBottomTab(state, action: PayloadAction<boolean>) {
      state.visibleBottomTab = action.payload
    },
    app_setOpenModalStreak(state, action: PayloadAction<boolean>) {
      state.openModalStreak = action.payload
    },
    app_setSnapIndexBottomSheetLevel(state, action: PayloadAction<number>) {
      state.snapIndexBottomSheetLevel = action.payload
    },
  },
})

export const app_reducerActions = appSlice.actions

export const app_selector = (state: RootState): AppSliceState => state.app
