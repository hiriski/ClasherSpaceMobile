import { IFeedbackState } from '@/contexts'

export enum FeedbackActionTypes {
  openBottomSheet = '@feedback/openBottomSheet',
  hasSubmittedFeedback = '@feedback/hasSubmittedFeedback',
}

/**
 * ----------------------------------
 * Safely type for our reducer :)
 */
type OpenBottomSheet = {
  type: FeedbackActionTypes.openBottomSheet
  payload: boolean
}

type SetHasSubmittedFeedback = {
  type: FeedbackActionTypes.hasSubmittedFeedback
  payload: boolean
}

/** ---------------------------------- */

export type FeedbackReducerActions = OpenBottomSheet | SetHasSubmittedFeedback

/**
 * feedback reducer
 * @param state IFeedbackState
 * @param action FeedbackReducerActions
 */
export const feedbackReducer = (state: IFeedbackState, action: FeedbackReducerActions): IFeedbackState => {
  const { type } = action
  switch (type) {
    case FeedbackActionTypes.openBottomSheet:
      return {
        ...state,
        openBottomSheet: action.payload,
      }
    case FeedbackActionTypes.hasSubmittedFeedback:
      return {
        ...state,
        hasSubmittedFeedback: action.payload,
      }
    default:
      return state
  }
}
