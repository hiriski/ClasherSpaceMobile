export interface IDropdown<T> {
  value: T
  label: string
}

export interface IApiResponseWithTimestamps {
  createdAt: string | null
  updatedAt: string | null
}
