import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { IconProps } from 'react-native-vector-icons/Icon'

type Props = IconProps

const FeatherIcon: FC<Props> = (props: Props) => <Icon {...props} />

export default FeatherIcon
