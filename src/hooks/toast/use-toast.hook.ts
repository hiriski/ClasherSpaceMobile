import { useCallback } from 'react'
import { IToastShowParams, ToastType, ToastVariant } from '@/interfaces'
import { platformUtils } from '@/utilities'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

const getToastType = (type: ToastType, variant: ToastVariant): ToastType => {
  if (!type || !variant) {
    return 'success'
  }
  if (variant === 'filled') {
    if (type === 'success') {
      return 'success_filled'
    } else if (type === 'info') {
      return 'info_filled'
    } else if (type === 'warning') {
      return 'warning_filled'
    } else if (type === 'error') {
      return 'error_filled'
    } else {
      return type
    }
  } else {
    return type
  }
}

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
          type: getToastType(params.type as ToastType, params.variant as ToastVariant),
          topOffset: TOP_OFFSET,
          bottomOffset: BOTTOM_OFFSET,
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
