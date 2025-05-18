import { ThemeBreakpoints, Themes } from './theme'

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends Themes {}
  export interface UnistylesBreakpoints extends ThemeBreakpoints {}
}
