// axios interceptors
import { axios } from '@/plugins/axios'

// interfaces
import { IUser } from '@/interfaces'

// utils
import { authUtils } from '@/utilities'

export interface IResponseUserWithToken {
  token: string
  user: IUser
}

export interface IRequestLogin {
  email: string
  password: string
  token_name?: string | null
}

export interface IRequestRegister {
  name: string
  email: string
  password: string
  password_confirmation: string
  photoUrl?: string | null
}

export interface IRequestSendLinkResetPassword {
  email: string
}

export interface IRequestResetPassword {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export interface IRequestVerifyTokenPasswordReset {
  token: string | null
  email: string | null
}

export interface IResponseLogin extends IResponseUserWithToken {}

export interface IResponseRegister extends IResponseUserWithToken {}

export interface IResponseResetPassword extends IResponseUserWithToken {}

export interface IResponseSendLinkResetPassword {
  success: boolean
}

const axiosInstance = axios

export const AuthApi = {
  loginWithEmailAndPassword: async (body: IRequestLogin): Promise<IResponseLogin> => {
    const response = await axiosInstance.post('/auth/login', body)
    return response.data
  },

  registerWithEmailAndPassword: async (body: IRequestRegister): Promise<IResponseLogin> => {
    const response = await axiosInstance.post('/auth/register', body)
    return response.data
  },

  sendRecoveryLink: async (body: IRequestSendLinkResetPassword): Promise<IResponseLogin> => {
    const response = await axiosInstance.post('/auth/send-reset-password-link', body)
    return response.data
  },

  verifyTokenPasswordReset: async (body: IRequestVerifyTokenPasswordReset): Promise<IUser> => {
    const response = await axiosInstance.post('auth/password-reset/verify', body)
    return response.data
  },

  resetPassword: async (body: IRequestResetPassword): Promise<IResponseResetPassword> => {
    const response = await axiosInstance.post('/auth/password-reset', body)
    return response.data
  },

  revokeToken: async (body: { currentAccessToken: string }): Promise<unknown> => {
    const response = await axiosInstance.post('/auth/revoke-token', body, {
      headers: {
        Authorization: `Bearer ${authUtils.getToken()}`,
      },
    })
    return response.data
  },

  getAuthenticatedUser: async (paramToken?: string): Promise<IUser> => {
    const response = await axiosInstance.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${paramToken ? paramToken : authUtils.getToken()}`,
      },
    })
    return response.data
  },
}
