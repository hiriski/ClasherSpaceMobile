import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

const isExtraSmallScreen: boolean = width < 360

const isSmallScreen: boolean = width < 380

export const screenUtils = {
  height,
  width,
  isSmallScreen,
  isExtraSmallScreen,
}
