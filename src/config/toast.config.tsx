// components
import { Toast, ToastProps } from '@/components/core'

interface ToastConfig {
  [key: string]: (params: ToastProps) => React.ReactNode
}

/**
 * Toast config
 */
const toastConfig: ToastConfig = {
  success: (props: ToastProps) => <Toast {...props} variant='default' />,
  success_filled: (props: ToastProps) => <Toast {...props} variant='filled' />,
  error: (props: ToastProps) => <Toast {...props} variant='default' />,
  error_filled: (props: ToastProps) => <Toast {...props} variant='filled' />,
  info: (props: ToastProps) => <Toast {...props} variant='default' />,
  info_filled: (props: ToastProps) => <Toast {...props} variant='filled' />,
  warning: (props: ToastProps) => <Toast {...props} variant='default' />,
  warning_filled: (props: ToastProps) => <Toast {...props} variant='filled' />,
  light: (props: ToastProps) => <Toast {...props} />,
  dark: (props: ToastProps) => <Toast {...props} />,
}

export { toastConfig }
