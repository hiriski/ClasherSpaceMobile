import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { IconProps } from 'react-native-vector-icons/Icon'

type Props = IconProps

const Ionicon: FC<Props> = props => <Icon {...props} />

export default Ionicon
