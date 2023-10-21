import { IThemePalette } from '@/interfaces'

const Icons = ['material-icons', 'material-community-icons', 'ionicons', 'feather'] as const

export type ButtonColor = keyof Pick<IThemePalette, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'>

export type ButtonVariant = 'contained' | 'outlined' | 'text'

export type AdornmentIconTypeButton = (typeof Icons)[number]
