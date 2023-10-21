import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconProps } from 'react-native-vector-icons/Icon'

type Props = IconProps

const MaterialCommunityIcon: FC<Props> = (props: Props) => <Icon {...props} />

export default MaterialCommunityIcon
