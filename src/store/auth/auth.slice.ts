// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// app config
import { RootState } from '@/store/store.root-reducer'
import {
  auth_getAuthenticatedUser,
  auth_revokeToken,
  auth_registerWithEmailAndPassword,
  auth_loginWithEmailAndPassword,
  auth_googleSignIn,
} from './auth.action'

// interfaces
import { IUser } from '@/interfaces'
import { IResponseLoginSuccess, IResponseRegisterSuccess } from '@/api'

// type for our state
export type AuthSliceState = {
  accessToken: string | null
  user: IUser | null
  openBottomSheetConfirmLogout: boolean
  sharedEmailValue: string | null
  awaitingVerifyRegisterCode: any
}

// initial state
export const auth_initialState: AuthSliceState = {
  accessToken: null,
  user: null,
  openBottomSheetConfirmLogout: false,
  sharedEmailValue: null,
  awaitingVerifyRegisterCode: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: auth_initialState,
  reducers: {
    auth_setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload
    },
    auth_setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
    },
    auth_setAwaitingVerifyRegisterCode(state, action: PayloadAction<any>) {
      state.awaitingVerifyRegisterCode = action.payload
    },
    auth_setSharedEmailValue(state, action: PayloadAction<string | null>) {
      state.sharedEmailValue = action.payload
    },
    auth_reset: () => auth_initialState,
  },
  extraReducers: builder => {
    builder.addCase(auth_getAuthenticatedUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload
      }
    })
    builder.addCase(auth_revokeToken.fulfilled, (state, _) => {
      state.accessToken = auth_initialState.accessToken
      state.user = auth_initialState.user
    })
    builder.addCase(auth_revokeToken.rejected, (state, _) => {
      state.accessToken = auth_initialState.accessToken
      state.user = auth_initialState.user
    })

    // register
    builder.addCase(auth_registerWithEmailAndPassword.fulfilled, (state, action) => {
      const response: IResponseRegisterSuccess = action.payload as IResponseRegisterSuccess
      if (response?.token) {
        state.user = response.user
        state.accessToken = response.token
      }
    })

    // login
    builder.addCase(auth_loginWithEmailAndPassword.fulfilled, (state, action) => {
      const response: IResponseLoginSuccess = action.payload as IResponseLoginSuccess
      if (response?.token) {
        state.user = response.user
        state.accessToken = response.token
      }
    })

    // login
    builder.addCase(auth_googleSignIn.fulfilled, (state, action) => {
      const response: IResponseLoginSuccess = action.payload as IResponseLoginSuccess
      if (response?.token) {
        state.user = response.user
        state.accessToken = response.token
      }
    })
  },
})

export const auth_reducerActions = authSlice.actions

export const auth_selector = (state: RootState): AuthSliceState => state.auth
