import Axios, { AxiosError, AxiosResponse } from 'axios'
import { appConfig } from '@/config'
import { log } from '@/helpers'

// On request rejected
const onRequestError = (axiosError: AxiosError): AxiosError => {
  /** @note logging for development only */
  if (__DEV__) {
    log.error(`❌ onRequestError -> ${JSON.stringify(axiosError)}`)
  }
  return axiosError
}

// On response fulfilled
const onResponseSuccess = (axiosResponse: AxiosResponse): AxiosResponse => {
  /** @note logging for development only */
  if (__DEV__) {
    log.info(`✅ onResponseSuccess -> ${JSON.stringify(axiosResponse)}`)
  }

  return axiosResponse
}

// On response rejected
const onResponseError = (axiosError: AxiosError): Promise<AxiosError> => {
  /** @note logging for development only */
  if (__DEV__) {
    log.error(`❌ onResponseError -> ${JSON.stringify(axiosError)}`)
  }

  if (axiosError.response) {
    /** Unprocessable entity */
    if (axiosError?.response?.status === 422) {
      // Do something with response
    }
  }
  return Promise.reject(axiosError)
}

/**
 * Axios instance
 */
const axios = Axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 20000,
})

// On request
axios.interceptors.request.use(
  async config => {
    return config
  },
  error => {
    return Promise.reject(onRequestError(error))
  }
)

// On response
axios.interceptors.response.use(
  async response => {
    return onResponseSuccess(response)
  },
  async error => {
    return onResponseError(error)
  }
)

export { axios }
