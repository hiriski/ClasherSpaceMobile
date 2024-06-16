// import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type UserStatus = 'active' | 'inactive'

export interface IUser {
  id: number
  name: string
  email: string
  photoUrl: string | null
  avatarTextColor: string
  gender: string | null
  about: string | null
  dateOfBirthday: string | null
  status: UserStatus
  createdAt: string
  updatedAt: string | null
}
