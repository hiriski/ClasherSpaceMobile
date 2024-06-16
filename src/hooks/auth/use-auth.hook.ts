import { useContext, useMemo } from 'react'

// context
import { AuthContext, AuthDispatchContext, IAuthState } from '@/contexts'

// action type
import { AuthActionTypes } from '@/reducers'

// import auth from '@react-native-firebase/auth'

// hooks
import { useToast } from '@/hooks'

export const useAuth = () => {
  const state = useContext(AuthContext)
  const dispatch = useContext(AuthDispatchContext)

  const { showToast } = useToast()

  const auth_setUser = (payload: IAuthState['user']) => {
    dispatch({ type: AuthActionTypes.setUser, payload })
  }

  const auth_signOut = () => {
    auth()
      .signOut()
      .then(() => {
        auth_resetAuth()
        showToast({
          text1: "You'are logged out",
          variant: 'filled',
          type: 'info',
          position: 'bottom',
        })
      })
      .catch(e => {
        auth_resetAuth()
      })
  }

  const auth_resetAuth = () => {
    auth_signOut()
    dispatch({ type: AuthActionTypes.resetAuth })
  }

  const isAuthenticated = useMemo(() => {
    return Boolean(state.user)
  }, [state.user])

  const auth_setLoginLoading = (payload: boolean) => {
    dispatch({ type: AuthActionTypes.loginLoading, payload })
  }
  const auth_setRegisterLoading = (payload: boolean) => {
    dispatch({ type: AuthActionTypes.registerLoading, payload })
  }

  const auth_setOpenBottomSheetConfirmLogout = (payload: boolean) => {
    dispatch({ type: AuthActionTypes.openBottomSheetConfirmLogout, payload })
  }

  return {
    ...state,
    isAuthenticated,
    auth_setUser,
    auth_signOut,
    auth_resetAuth,
    auth_setLoginLoading,
    auth_setRegisterLoading,
    auth_setOpenBottomSheetConfirmLogout,
  }
}
