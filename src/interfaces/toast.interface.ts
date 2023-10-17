import { ToastShowParams } from 'react-native-toast-message'

export type ToastType =
  | 'success'
  | 'success_filled'
  | 'error'
  | 'error_filled'
  | 'warning'
  | 'warning_filled'
  | 'info'
  | 'info_filled'
  | 'light'
  | 'dark'

export type ToastVariant = 'default' | 'filled'

export interface IToastShowParams extends ToastShowParams {
  // default value is 'default
  type: ToastType
  variant?: ToastVariant
}
