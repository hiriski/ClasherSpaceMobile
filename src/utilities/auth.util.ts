import { IUser } from '@/interfaces'
import { storageUtils } from './storage.util'

const getToken = (): string | null => {
  return storageUtils.getString('TOKEN') ?? null
}

const saveToken = (token: string): void => {
  storageUtils.saveString('TOKEN', token)
}

const saveUserInfo = (user: IUser): void => {
  storageUtils.save('USER', user)
}

const removeTokenFromStorage = (): void => {
  storageUtils.remove('TOKEN')
}

export const authUtils = {
  getToken,
  saveToken,
  saveUserInfo,
  removeTokenFromStorage,
}
