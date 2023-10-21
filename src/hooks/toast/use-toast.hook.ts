import { useCallback } from 'react'
import { IToastShowParams } from '@/interfaces'
import { platformUtils } from '@/utilities'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export const useToast = () => {
  const insets = useSafeAreaInsets()

  const TOP_OFFSET = platformUtils.isAndroid ? insets.top + 20 : insets.top + 6
  const BOTTOM_OFFSET = platformUtils.isAndroid ? 20 : 32

  const showToast = useCallback(
    (params: IToastShowParams) => {
      // hide previous toast
      Toast.hide()

      // show new toast
      setTimeout(() => {
        Toast.show({
          ...params,
          type: params.type ?? 'success',
          topOffset: params.fullWidth ? 0 : TOP_OFFSET,
          bottomOffset: params.fullWidth ? 0 : BOTTOM_OFFSET,
          props: {
            fullWidth: params.fullWidth ?? false,
            variant: params.variant ?? 'filled',
          },
        })
      }, 150)
    },
    [insets.top]
  )

  const hideToast = useCallback(() => {
    Toast.hide()
  }, [])

  return { showToast, hideToast }
}
