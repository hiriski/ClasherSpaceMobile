// redux toolkit
import { createSlice } from '@reduxjs/toolkit'

// app config
import { RootState } from '@/store/store.root-reducer'
import { baseLayout_fetchList } from './base-layout.action'

// constants
import { PAGINATION_DEFAULT } from '@/constants'

// type for our state
export interface IBaseLayoutState {
  baseLayout_listData: IBaseLayout[]
  baseLayout_pagination: IPagination
  baseLayout_isLoading: boolean
}

// initial state
export const baseLayout_initialState: IBaseLayoutState = {
  baseLayout_listData: [],
  baseLayout_pagination: { ...PAGINATION_DEFAULT },
  baseLayout_isLoading: false,
}

export const baseLayoutSlice = createSlice({
  name: 'base_layout',
  initialState: baseLayout_initialState,
  reducers: {
    baseLayout_reset: () => baseLayout_initialState,
  },
  extraReducers: builder => {
    // fetch list
    builder.addCase(baseLayout_fetchList.pending, (state, _) => {
      state.baseLayout_isLoading = true
    })
    builder.addCase(baseLayout_fetchList.fulfilled, (state, action) => {
      const currentPage = action.meta.arg.page ?? 1
      const data = currentPage > 1 ? [...state.baseLayout_listData, ...action.payload.data] : action.payload.data ?? []
      state.baseLayout_listData = data
      state.baseLayout_pagination = action.payload.meta
      state.baseLayout_isLoading = false
    })
    builder.addCase(baseLayout_fetchList.rejected, (state, _) => {
      state.baseLayout_isLoading = false
    })
  },
})

export const baseLayout_reducerActions = baseLayoutSlice.actions

export const baseLayout_selector = (state: RootState): IBaseLayoutState => state.base_layout
