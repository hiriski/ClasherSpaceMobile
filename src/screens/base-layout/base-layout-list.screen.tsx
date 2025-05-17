import { FlatList, View } from 'react-native'
import { IconButton, Screen } from '@/components/core'
import { useTheme } from '@/hooks'
import { IBaseLayout } from '@/interfaces'
import { BaseLayoutCardItem } from '@/components/base-layout'
import { themeConfig } from '@/config'
import { blue } from '@/libs'

const data: Array<IBaseLayout> = [
  {
    id: '5CZE3OD0esqYWaZu0cPo',
    link: 'https://link.clashofclans.com/en?action=OpenLayout&id=TH15%3AWB%3AAAAADQAAAAIzLBeUnbkRtvdbWFr7h0TV',
    name: 'Lorem Ipsum dolor sit amit amit jabang bayi',
    userId: 'SSLncQSWHRb1ZcX4TXLXjyDAPxs1',
    townHallLevel: 15,
    builderHallLevel: null,
    isBuilderHall: false,
    photoURL: 'https://cocbases.com/wp-content/uploads/3013.jpg',
    categories: ['war', 'hybrid', 'trophy', 'farm'],
    tags: [],
    createdAt: '',
    updatedAt: null,
    views: 12,
    likedCount: 2,
    markedAsWarBase: false,
  },
  {
    id: '5CZE3OD0esqYWaZu0cP1',
    link: 'https://link.clashofclans.com/en?action=OpenLayout&id=TH15%3AWB%3AAAAAVQAAAAFuoOtZnaqrVpVEfPWQSD_-',
    name: 'Untitled #5',
    userId: 'SSLncQSWHRb1ZcX4TXLXjyDAPxs1',
    townHallLevel: 15,
    builderHallLevel: null,
    isBuilderHall: false,
    photoURL: 'https://cocbases.com/wp-content/uploads/3014.jpg',
    categories: ['war', 'hybrid', 'trophy', 'farm'],
    tags: [],
    createdAt: '',
    updatedAt: null,
    views: 12,
    likedCount: 2,
    markedAsWarBase: false,
  },
  {
    id: '5CZE3OD0esqYWaZu0cP2',
    link: 'https://link.clashofclans.com/en?action=OpenLayout&id=TH15%3AWB%3AAAAADQAAAAIzLAPUo9hCuhUI6tai2qRF',
    name: 'Untitled #11',
    userId: 'SSLncQSWHRb1ZcX4TXLXjyDAPxs1',
    townHallLevel: 15,
    builderHallLevel: null,
    isBuilderHall: false,
    photoURL: 'https://cocbases.com/wp-content/uploads/3012.jpg',
    categories: ['war', 'hybrid', 'trophy', 'farm'],
    tags: [],
    createdAt: '',
    updatedAt: null,
    views: 12,
    likedCount: 2,
    markedAsWarBase: false,
  },
  {
    id: '5CZE3OD0esqYWaZu0cP3',
    link: 'https://link.clashofclans.com/en?action=OpenLayout&id=TH15%3AWB%3AAAAAVQAAAAFuoO1o9_k_6MHxE_IfLVzU',
    name: 'Untitled #22',
    userId: 'SSLncQSWHRb1ZcX4TXLXjyDAPxs1',
    townHallLevel: 15,
    builderHallLevel: null,
    isBuilderHall: false,
    photoURL: 'https://cocbases.com/wp-content/uploads/3015.jpg',
    categories: ['war', 'hybrid', 'trophy', 'farm'],
    tags: [],
    createdAt: '',
    updatedAt: null,
    views: 12,
    likedCount: 2,
    markedAsWarBase: false,
  },
  {
    id: '5CZE3OD0esqYWaZu0cP5',
    link: 'https://link.clashofclans.com/en?action=OpenLayout&id=TH15%3AWB%3AAAAADQAAAAIzK-8c3KkAS--tYcC4Qr2Y',
    name: 'Untitled #31',
    userId: 'SSLncQSWHRb1ZcX4TXLXjyDAPxs1',
    townHallLevel: 15,
    builderHallLevel: null,
    isBuilderHall: false,
    photoURL: 'https://cocbases.com/wp-content/uploads/3016.jpg',
    categories: ['war', 'hybrid', 'trophy', 'farm'],
    tags: [],
    createdAt: '',
    updatedAt: null,
    views: 12,
    likedCount: 2,
    markedAsWarBase: false,
  },
]

const HeaderRightContent = () => {
  return (
    <View style={{ marginRight: -12, flexDirection: 'row' }}>
      <IconButton size='medium' icon='filter-outline' iconType='material-community-icons' iconSize={22} iconColor='#ffffff' />
    </View>
  )
}

const BaseLayoutListScreen = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Screen
      preset='fixed'
      titleColor='#fff'
      statusBarStyle='light-content'
      title='Bases'
      titleSize='medium'
      headerBackgroundColor={blue[500]}
      backgroundColor={theme.palette.background.default}
      headerRightContent={<HeaderRightContent />}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <BaseLayoutCardItem item={item} />}
          contentContainerStyle={{ paddingTop: 20, paddingHorizontal: themeConfig.horizontalSpacing }}
        />
      </View>
    </Screen>
  )
}

export default BaseLayoutListScreen
