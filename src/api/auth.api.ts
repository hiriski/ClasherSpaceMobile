import { log } from '@/helpers'
import axiosInstance from '@/http/axios-instance'
import { IUser } from '@/interfaces'
import { IApiResponseError, IUnprocessableEntity } from '@/interfaces/http.interface'

export interface IRequestLogin {
  email: string
  password: string
}

export interface IRequestRegister {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface IRequestGoogleSignIn {
  providerAccountId: string // uuid
  providerEmail: string
  providerAccountName: string
  providerPhotoUrl: string | null
  providerName: 'google' | 'facebook' | 'github'
}

export interface IRequestVerifyResetPasswordLink {
  token: string
  email: string
}

export interface IRequestResetPassword {
  password: string
  token: string
  email: string
}

export interface IResponseLoginSuccess {
  token: string
  user: IUser
}

export interface IResponseRegisterSuccess extends IResponseLoginSuccess {}

export const AuthAPI = {
  registerWithEmailAndPassword: async (body: IRequestRegister): Promise<IResponseRegisterSuccess | IUnprocessableEntity> => {
    // try {
    const response = await axiosInstance.post('/api/auth/register', body)
    return response.data
  },
  loginWithEmailAndPassword: async (body: IRequestLogin): Promise<IResponseLoginSuccess | IApiResponseError> => {
    const response = await axiosInstance.post('/api/auth/login', body)
    return response.data
  },
  googleSignIn: async (body: IRequestGoogleSignIn): Promise<IResponseLoginSuccess | IApiResponseError> => {
    const response = await axiosInstance.post('/api/auth/google/mobile', body)
    return response.data
  },
  getAuthenticatedUser: async (): Promise<IUser | IApiResponseError> => {
    const response = await axiosInstance.get('/api/auth/user')
    return response.data
  },
  revokeToken: async (currentAccessToken: string) => {
    const response = await axiosInstance.post('/api/auth/revoke-token', { currentAccessToken })
    log.warn('revokeToken', JSON.stringify(response))
    return response.data
  },
  sendResetPasswordLink: async (email: string) => {
    const response = await axiosInstance.post('/api/auth/send-reset-password-link', { email })
    return response.data
  },
  verifyResetPasswordLink: async (body: IRequestVerifyResetPasswordLink) => {
    const response = await axiosInstance.post('/api/auth/password-reset/verify', body)
    return response.data
  },
  resetPassword: async (body: IRequestResetPassword) => {
    const response = await axiosInstance.post('/api/auth/send-reset-password-link', body)
    return response.data
  },
}
