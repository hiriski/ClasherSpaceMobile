export interface IBaseApiResponse<T> {
  data: T
}

export interface IApiResponseError {
  message: string
}

export interface IUnprocessableEntity extends IApiResponseError {
  errors?: {
    [key: string]: string[]
  }
}
