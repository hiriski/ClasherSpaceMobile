import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseLayoutApi } from '@/api/base-layout.api'

export const baseLayout_fetchList = createAsyncThunk(
  '@baseLayout/fetchList',
  async (params: IBaseRequestParamsCollection): Promise<IApiResponseCollection<IBaseLayout[]>> => {
    return await BaseLayoutApi.fetchList(params)
  }
)
