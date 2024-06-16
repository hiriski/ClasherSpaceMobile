import { combineReducers } from '@reduxjs/toolkit'

import { appPersistedSlice, appSlice } from '@/store/app'

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [appPersistedSlice.name]: appPersistedSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
