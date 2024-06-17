import { auth_selector, auth_reducerActions } from '@/store/auth/auth.slice'
import * as auth_thunkAction from '@/store/auth/auth.action'
import { useAppSelector } from '@/store'

export const useAuth = () => {
  const authState = useAppSelector(auth_selector)

  return {
    ...authState,
    ...auth_thunkAction,
    ...auth_reducerActions,
  }
}
