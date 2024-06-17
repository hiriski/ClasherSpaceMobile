import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthAPI, IRequestRegister } from '@/api'
import { IUser } from '@/interfaces'
import { isAxiosError } from 'axios'

export const auth_getAuthenticatedUser = createAsyncThunk('@auth/getAuthenticatedUser', async (): Promise<IUser> => {
  return await AuthAPI.getAuthenticatedUser()
})

// prettier-ignore
export const auth_registerWithEmailAndPassword = createAsyncThunk('@auth/registerWithEmailAndPassword', async (body: IRequestRegister, { rejectWithValue }) => {
  try {
    return await AuthAPI.registerWithEmailAndPassword(body)
  } catch(e) {
    if(isAxiosError(e)) {
      return rejectWithValue(e?.response)
    }
  }
})

export const auth_revokeToken = createAsyncThunk('@auth/revokeToken', async (accessToken: string) => {
  return await AuthAPI.revokeToken(accessToken)
})
