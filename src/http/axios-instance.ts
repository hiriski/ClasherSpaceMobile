import Axios, { AxiosError, AxiosResponse } from 'axios'
import { appConfig } from '@/configs'
import { store } from '@/store'

// On request rejected
const onRequestError = (axiosError: AxiosError) => {
  return axiosError
}

// On response fulfilled
const onResponseSuccess = (axiosResponse: AxiosResponse) => {
  return axiosResponse
}

// On response rejected
const onResponseError = (axiosError: AxiosError) => {
  if (axiosError?.response?.status === 401) {
    // do something when token expire
  }
  return Promise.reject(axiosError)
}

/**
 * Axios instance
 */
const axiosInstance = Axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 20000,
})

// On request
axiosInstance.interceptors.request.use(
  async config => {
    try {
      const accessToken = store.getState()?.auth?.accessToken || null
      if (accessToken) {
        // eslint-disable-next-line dot-notation
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
    } catch (e) {
      console.log(e)
    }
    return config
  },
  error => {
    return Promise.reject(onRequestError(error))
  }
)
// On response
axiosInstance.interceptors.response.use(
  async response => {
    return onResponseSuccess(response)
  },
  async error => {
    return onResponseError(error)
  }
)

export default axiosInstance
