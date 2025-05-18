import { combineReducers } from '@reduxjs/toolkit'

import { appPersistedSlice, appSlice } from '@/store/app'
import { authSlice } from './auth'
import { baseLayoutSlice } from './base-layout'

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [appPersistedSlice.name]: appPersistedSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [baseLayoutSlice.name]: baseLayoutSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
