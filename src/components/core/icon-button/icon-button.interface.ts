import { ButtonColor } from '../button'

const Icons = ['material-icons', 'material-community-icons', 'ionicons', 'feather'] as const

export type IconButtonColor = 'default' | ButtonColor
export type IconButtonVariant = 'default' | 'contained'
export type IconTypeIconButton = (typeof Icons)[number]
