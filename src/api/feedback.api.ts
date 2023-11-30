import { axios } from '@/plugins/axios'

// interfaces
import { FeedbackType, IFeedback } from '@/interfaces'

export interface IRequestCreateFeedback {
  email: string
  type: FeedbackType
  body: string
}

const axiosInstance = axios

export const FeedbackApi = {
  createFeedback: async (body: IRequestCreateFeedback): Promise<IFeedback> => {
    const response = await axiosInstance.post('/feedback', body)
    return response.data
  },
}
