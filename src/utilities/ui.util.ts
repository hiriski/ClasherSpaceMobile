import changeNavigationBarColor from 'react-native-navigation-bar-color'

export const changeNavbarBarColor = (color: string, light?: boolean, animated?: boolean): void => {
  try {
    changeNavigationBarColor(color, light, animated)
  } catch (e) {
    // console.log(e) // {success: false}
  }
}

export const uiUtils = {
  changeNavbarBarColor,
}
