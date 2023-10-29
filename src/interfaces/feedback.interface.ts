import { IApiResponseWithTimestamps } from './common.interface'

export type FeedbackType = 'bug' | 'missing_feature' | 'improvement' | 'other'

export interface IFeedback extends IApiResponseWithTimestamps {
  id: number
  email: string
  type: FeedbackType
  body: string
}
