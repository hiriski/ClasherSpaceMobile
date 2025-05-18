declare global {
  interface IPagination {
    currentPage: number
    perPage: number
    lastPage: number
    total: number
  }

  interface IBaseApiResponse<T> {
    data: T
    status: number
    message: string
  }

  interface IApiResponseCollection<T> extends IBaseApiResponse<T> {
    meta: IPagination
  }

  interface IApiResponseError {
    message: string
  }

  interface IApiResponseUnprocessableEntity extends IApiResponseError {
    errors?: {
      [key: string]: string[]
    }
  }

  interface IBaseRequestParamsCollection {
    paginate: boolean
    page?: number
    perPage?: number
    orderColumn?: createdAt
    orderType?: desc
  }
}

export {}
