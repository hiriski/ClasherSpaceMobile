import { IApiResponseWithTimestamps } from './common.interface'

export interface IUser extends IApiResponseWithTimestamps {
  id: number
  name: string
  email: string
  photoUrl: null
  avatarTextColor: string
  gender: string | null
  about: string | null
  dateOfBirthday: null
  status: string
}
