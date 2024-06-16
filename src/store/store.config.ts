// redux tookit
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

// redux persist
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'

// root reducer
import rootReducer, { RootState } from './store.root-reducer'

// redux flipper
// import reduxFlipper from 'redux-flipper'

// emv
// import { NODE_ENV } from '@env';

// storage
import { persistStorage } from './store.storage'
import { StorageKeys } from '@/constants'
import { appPersistedSlice } from './app'
import { authSlice } from './auth'

// reducers
// import { appApi } from '@/modules/app/redux'

// persist config
const persistConfig: PersistConfig<RootState> = {
  key: StorageKeys.PERSIST_ROOT,
  version: 1,
  storage: persistStorage,
  whitelist: [appPersistedSlice.name, authSlice.name],
}

// make persisted store
const persistedReducer = persistReducer(persistConfig, rootReducer)

// listener middleware
export const listenerMiddleware = createListenerMiddleware()

// root store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .prepend(listenerMiddleware.middleware)
      .concat([])

    // flipper debugger (for development purpose only)
    // if (__DEV__) {
    //   middlewares.push(reduxFlipper())
    // }

    return middlewares
  },
})

// store that persisted
const persistor = persistStore(store)

// types
export type RootDispatch = typeof store.dispatch

export { store, persistor }
