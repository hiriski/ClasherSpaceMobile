import { STORAGE_KEYS } from '@/constants'
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

/**
 * get a string from storage.
 */
export function getString(key: STORAGE_KEYS): string {
  return storage.getString(key) ?? ''
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: STORAGE_KEYS, value: string): void {
  storage.set(key, String(value))
}

/**
 * Gets something from storage and runs it thru JSON.parse.
 */
export function get<T = any>(key: STORAGE_KEYS): T | null {
  const value = storage.getString(key)
  return value ? JSON.parse(value as string) : null
}

/**
 * Saves an object to storage.
 */
export function save(key: STORAGE_KEYS, value: any): void {
  storage.set(key, JSON.stringify(value))
}

/**
 * Removes something from storage.
 */
export function remove(key: STORAGE_KEYS): void {
  storage.delete(key)
}

/**
 * Burn it all to the ground.
 */
export function clear(): void {
  storage.clearAll()
}

export const storageUtils = { getString, saveString, get, save, remove, clear }
