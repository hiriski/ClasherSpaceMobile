import axiosInstance from '@/http/axios-instance'

export interface IRequestParamsGetBaseLayout extends IBaseRequestParamsCollection {
  baseType?: string
  name?: string
  categoryId?: number
  townHallLevel?: number
  builderHallLevel?: number
}

export const BaseLayoutApi = {
  fetchList: async (params: IRequestParamsGetBaseLayout): Promise<IApiResponseCollection<IBaseLayout[]>> => {
    console.log('fetchList -> params', params)
    const response = await axiosInstance.get('/base-layout/base', { params })
    return response.data
  },
}
