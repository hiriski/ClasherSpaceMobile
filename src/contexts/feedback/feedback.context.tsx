import React, { FC, createContext, PropsWithChildren, useReducer, Dispatch } from 'react'

// reducers
import { FeedbackReducerActions, feedbackReducer } from '@/reducers'
import { storageUtils } from '@/utilities'

// type for our context
export interface IFeedbackState {
  openBottomSheet: boolean
  hasSubmittedFeedback: boolean
}

// feedback context provider
export const FeedbackContext = createContext<IFeedbackState>({} as IFeedbackState)

// feedback dispatch provider
export const FeedbackDispatchContext = createContext<Dispatch<FeedbackReducerActions>>(
  null as unknown as Dispatch<FeedbackReducerActions>
)

/**
 * initial state
 */
export const feedbackContext_initialState: IFeedbackState = {
  openBottomSheet: false,
  hasSubmittedFeedback: false,
}

// feedback context provider
export const FeedbackContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(feedbackReducer, feedbackContext_initialState)
  return (
    <FeedbackContext.Provider value={state}>
      <FeedbackDispatchContext.Provider value={dispatch}>{children}</FeedbackDispatchContext.Provider>
    </FeedbackContext.Provider>
  )
}
