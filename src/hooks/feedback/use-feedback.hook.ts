import { useContext } from 'react'

// context
import { FeedbackContext, FeedbackDispatchContext } from '@/contexts'

// action type
import { FeedbackActionTypes } from '@/reducers'
import { storageUtils } from '@/utilities'

export const useFeedback = () => {
  const state = useContext(FeedbackContext)
  const dispatch = useContext(FeedbackDispatchContext)

  const feedback_setOpenBottomSheet = (payload: boolean) => {
    dispatch({ type: FeedbackActionTypes.openBottomSheet, payload })
  }
  const feedback_setHasSubmittedFeedback = (payload: boolean) => {
    storageUtils.save('SUBMITTED_FEEDBACK', payload)
    dispatch({ type: FeedbackActionTypes.hasSubmittedFeedback, payload })
  }

  return {
    ...state,
    feedback_setOpenBottomSheet,
    feedback_setHasSubmittedFeedback,
  }
}
