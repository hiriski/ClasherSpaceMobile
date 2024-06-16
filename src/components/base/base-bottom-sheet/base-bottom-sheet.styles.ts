import { StyleSheet } from 'react-native'

import { theme_paletteLight } from '@/configs'

export const bottomSheetStyles = StyleSheet.create({
  bottomSheet_root: {
    flex: 1,
  },
  bottomSheet_backgroundStyle: {},
  bottomSheet_handleIndicatorStyle: {
    height: 3,
    width: 32,
    borderRadius: 3,
    backgroundColor: theme_paletteLight.divider,
  },
  bottomSheet_content: {
    flex: 1,
  },
})
