import React, { FC } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { IconProps as RnVectorIconProps } from 'react-native-vector-icons/Icon'
import { RNVectorIconProvider } from '@/interfaces'

interface IconProps extends RnVectorIconProps {
  provider: RNVectorIconProvider
}

const Icon: FC<IconProps> = ({ provider, ...rest }) => {
  if (provider === 'ionicons') {
    return <Ionicon {...rest} />
  } else if (provider === 'material-icons') {
    return <MaterialIcon {...rest} />
  } else if (provider === 'material-community-icons') {
    return <MaterialCommunityIcon {...rest} />
  } else if (provider === 'feather') {
    return <FeatherIcon {...rest} />
  } else {
    return null
  }
}

export default Icon
