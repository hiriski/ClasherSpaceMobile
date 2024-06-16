import { ResourceLanguage } from 'i18next'
import { AppLanguageCode } from '@/interfaces'

// translations
import * as common from '@/translations/common'

export const translations: Record<AppLanguageCode, ResourceLanguage> = {
  en: {
    translation: {
      ...common.en,
    },
  },
  id: {
    translation: {
      ...common.id,
    },
  },
  vi: {
    translation: {
      ...common.vi,
    },
  },
}
