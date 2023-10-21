import React, { FC } from 'react'
import { StatusBar as ReactNativeStatusBar, StatusBarProps } from 'react-native'

// hooks
import { useTheme } from '@/hooks'

const StatusBar: FC<StatusBarProps> = (props): JSX.Element => {
  const { isDarkMode } = useTheme()
  return <ReactNativeStatusBar barStyle={props.barStyle ?? isDarkMode ? 'light-content' : 'dark-content'} {...props} />
}

StatusBar.defaultProps = {
  barStyle: 'dark-content',
}

export default StatusBar
