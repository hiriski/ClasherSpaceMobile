import { auth_selector, auth_reducerActions } from '@/store/auth/auth.slice'
import * as auth_thunkAction from '@/store/auth/auth.action'
import { useAppSelector } from '@/store'
import { useMemo } from 'react'

export const useAuth = () => {
  const authState = useAppSelector(auth_selector)

  const isAuthenticated = useMemo(() => {
    return Boolean(authState.accessToken) && Boolean(authState.user?.id)
  }, [authState.accessToken, authState.user])

  return {
    isAuthenticated,
    ...authState,
    ...auth_thunkAction,
    ...auth_reducerActions,
  }
}
