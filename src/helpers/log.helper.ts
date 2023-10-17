import { logger } from 'react-native-logs'

export const log = logger.createLogger({
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'white',
    },
  },
})
