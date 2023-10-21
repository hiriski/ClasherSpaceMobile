import { ToastShowParams } from 'react-native-toast-message'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark'

export type ToastVariant = 'default' | 'filled'

export interface IToastShowParams extends ToastShowParams {
  // Default value: `default`
  type?: ToastType

  // Default value: 'success
  variant?: ToastVariant

  /**
   * full width toast
   * Default value: false`
   */
  fullWidth?: boolean
}
