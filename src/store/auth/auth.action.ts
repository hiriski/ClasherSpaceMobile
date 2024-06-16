import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthAPI, IResponseLoginSuccess } from '@/api'
import { IUser } from '@/interfaces'

export const auth_getAuthenticatedUser = createAsyncThunk('@auth/getAuthenticatedUser', async (): Promise<IUser> => {
  return await AuthAPI.getAuthenticatedUser()
})

export const auth_revokeToken = createAsyncThunk('@auth/revokeToken', async (accessToken: string) => {
  return await AuthAPI.revokeToken(accessToken)
})
