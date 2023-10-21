// components
import { Toast, ToastProps } from '@/components/core'

interface ToastConfig {
  [key: string]: (params: ToastProps) => React.ReactNode
}

/**
 * Toast config
 */
export const toastConfig: ToastConfig = {
  success: (props: ToastProps) => <Toast {...props} />,
  error: (props: ToastProps) => <Toast {...props} />,
  info: (props: ToastProps) => <Toast {...props} />,
  warning: (props: ToastProps) => <Toast {...props} />,
  light: (props: ToastProps) => <Toast {...props} />,
  dark: (props: ToastProps) => <Toast {...props} />,
}
