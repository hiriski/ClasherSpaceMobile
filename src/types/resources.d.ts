declare global {
  interface IUser {
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

  interface IBaseLayout {
    id: number
    name: string
    link: string
    description: string
    userId: IUser['id']
    townHallLevel: 12
    builderHallLevel: number | null
    baseType: string
    imageUrls: string[]
    views: number
    likedCount: number
    isWarBase: boolean
    categories: string[]
    tags: string[]
    user: IUser
    createdAt: string | null
    updatedAt: string | null
  }
}

export {}
