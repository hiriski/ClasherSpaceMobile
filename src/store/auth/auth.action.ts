import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthAPI, IRequestGoogleSignIn, IRequestLogin, IRequestRegister } from '@/api'
import { IUser } from '@/interfaces'
import { isAxiosError } from 'axios'
import { Alert } from 'react-native'

export const auth_getAuthenticatedUser = createAsyncThunk('@auth/getAuthenticatedUser', async (): Promise<IUser> => {
  return await AuthAPI.getAuthenticatedUser()
})

// prettier-ignore
export const auth_registerWithEmailAndPassword = createAsyncThunk('@auth/registerWithEmailAndPassword', async (body: IRequestRegister, { rejectWithValue }) => {
  try {
    return await AuthAPI.registerWithEmailAndPassword(body)
  } catch(e) {
    if(isAxiosError(e)) {
      return rejectWithValue(e?.response?.data)
    }
  }
})

// prettier-ignore
export const auth_loginWithEmailAndPassword = createAsyncThunk('@auth/loginWithEmailAndPassword', async (body: IRequestLogin, { rejectWithValue }) => {
  try {
    return await AuthAPI.loginWithEmailAndPassword(body)
  } catch(e) {
    if(isAxiosError(e)) {
      return rejectWithValue(e?.response?.data)
    }
  }
})

// prettier-ignore
export const auth_googleSignIn = createAsyncThunk('@auth/googleSignIn', async (body: IRequestGoogleSignIn, { rejectWithValue }) => {
  try {
    return await AuthAPI.googleSignIn(body)
  } catch(e) {
    if(isAxiosError(e)) {
      return rejectWithValue(e?.response?.data)
    }
  }
})

export const auth_revokeToken = createAsyncThunk('@auth/revokeToken', async (accessToken: string) => {
  return await AuthAPI.revokeToken(accessToken)
})
