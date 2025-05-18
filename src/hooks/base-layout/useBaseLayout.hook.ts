import { baseLayout_selector, baseLayout_reducerActions } from '@/store/base-layout/base-layout.slice'
import * as baseLayout_thunkAction from '@/store/base-layout/base-layout.action'
import { useAppSelector } from '@/store'

export const useBaseLayout = () => {
  const authState = useAppSelector(baseLayout_selector)

  return {
    ...authState,
    ...baseLayout_thunkAction,
    ...baseLayout_reducerActions,
  }
}
