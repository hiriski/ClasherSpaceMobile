// import { FirebaseAuthTypes } from '@react-native-firebase/auth'

// type UserStatus = 'active' | 'inactive'

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export interface IUserAuthProvider {
  id: number
  userId: number
  providerAccountId: string // uuid
  providerAccountName: string
  providerPhotoUrl: string | null
  providerName: string
  createdAt: string
  updatedAt: string | null
}

export interface IUser {
  id: 1
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
  authProvider: IUserAuthProvider
}
