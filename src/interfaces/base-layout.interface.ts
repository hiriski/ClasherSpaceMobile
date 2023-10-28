export interface IBaseLayout {
  id: string
  link: string
  name: string
  userId?: string | null
  townHallLevel?: number | null
  builderHallLevel?: number | null
  isBuilderHall: boolean
  photoURL?: string | null
  categories: Array<string>
  tags: Array<string>
  createdAt: string
  updatedAt?: string | null
  views: number
  likedCount: number
  markedAsWarBase: boolean
}
