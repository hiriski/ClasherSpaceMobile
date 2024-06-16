import { app_selector, app_reducerActions } from '@/store/app/app.slice'
import { appPersisted_selector, appPersisted_reducerActions } from '@/store/app/app.persisted.slice'
import { useAppSelector } from '@/store'

export const useApp = () => {
  const appState = useAppSelector(app_selector)
  const appPersistedState = useAppSelector(appPersisted_selector)

  return {
    ...appState,
    ...appPersistedState,
    ...app_reducerActions,
    ...appPersisted_reducerActions,
  }
}
