import { AssetsAvatars } from './avatars'

import SVGUserDuoToneIcon from '@/assets/svg/user-bold-duotone.svg'
import SVGWidgetDuoToneIcon from '@/assets/svg/widget-bold-duotone.svg'
import SVGLayersDuoToneIcon from '@/assets/svg/layers-bold-duotone.svg'
import SVGVideoDuoToneIcon from '@/assets/svg/video-library-bold-duotone.svg'

export const Assets = {
  logoDark: require('./images/logo-dark.png'),
  logoDarkSm: require('./images/logo-dark-sm.png'),
  logoDarkXs: require('./images/logo-dark-xs.png'),

  logoLight: require('./images/logo-light.png'),
  logoLightSm: require('./images/logo-light-sm.png'),
  logoLightXs: require('./images/logo-light-xs.png'),

  clashOfClans1: require('./images/clash_of_clans_1.jpg'),
  clashOfClans2: require('./images/clash_of_clans_2.jpg'),
  clashOfClans3: require('./images/clash_of_clans_3.jpg'),

  SVGUserDuoToneIcon,
  SVGWidgetDuoToneIcon,
  SVGLayersDuoToneIcon,
  SVGVideoDuoToneIcon,

  ...AssetsAvatars,
}
