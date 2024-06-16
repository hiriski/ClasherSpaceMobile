import { MMKV } from 'react-native-mmkv'
import { Storage as ReduxPersistStorage } from 'redux-persist'

const storage = new MMKV()

export const persistStorage: ReduxPersistStorage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: key => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: key => {
    storage.delete(key)
    return Promise.resolve()
  },
}
