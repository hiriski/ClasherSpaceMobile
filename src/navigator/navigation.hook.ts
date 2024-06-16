import { useNavigation as useBaseNavigation } from '@react-navigation/native'
import { NavigationProps } from './navigation.type'

export const useNavigation = () => {
  return useBaseNavigation<NavigationProps>()
}
