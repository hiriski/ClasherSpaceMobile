export const StorageKeys = {
  TOKEN: '@TOKEN', // object
  USER: '@USER', // JSON string
  CONFIGURATIONS: '@CONFIGURATIONS', // JSON string
  IS_ALREADY_LAUNCHED: '@IS_ALREADY_LAUNCHED', // boolean
  NAVIGATION_STATE: 'NAVIGATION_STATE',
  SUBMITTED_FEEDBACK: 'SUBMITTED_FEEDBACK',
  LANGUAGE: 'LANGUAGE', // string 'en' | 'id' | 'vi'
}

export type STORAGE_KEYS = keyof typeof StorageKeys
