import * as platformUtils from './platform.util'
import * as screenUtils from './screen.util'
import * as uiUtils from './ui.util'

export const appUtils = {
  ...platformUtils,
  ...screenUtils,
  // ...storageUtils, // Don't spread it
  ...uiUtils,
}
