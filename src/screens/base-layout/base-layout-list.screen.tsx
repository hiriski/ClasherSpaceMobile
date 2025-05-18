import { Alert, FlatList, View } from 'react-native'
import { IconButton, Screen } from '@/components/core'
import { useBaseLayout, useTheme } from '@/hooks'
import { BaseLayoutCardItem } from '@/components/base-layout'
import { themeConfig } from '@/configs'
import { blue } from '@/libs'
import { IBaseLayout } from '@/interfaces'
import { Fragment, JSX, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { IRequestParamsGetBaseLayout } from '@/api/base-layout.api'
import RenderCounter from '@/components/common/render-counter'
import { useAppDispatch, useAppSelector } from '@/store'
import { baseLayout_fetchList, baseLayout_selector } from '@/store/base-layout'
import { FlashList } from '@shopify/flash-list'

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

let renderCount = 0
const HeaderRightContent = () => {
  return (
    <View style={{ marginRight: -12, flexDirection: 'row' }}>
      <IconButton size='medium' icon='filter-outline' iconType='material-community-icons' iconSize={22} iconColor='#ffffff' />
    </View>
  )
}

const BaseLayoutListScreen = (): JSX.Element => {
  const theme = useTheme()

  // const { baseLayout_fetchList, baseLayout_listData } = useBaseLayout()

  const dispatch = useAppDispatch()
  const { baseLayout_listData, baseLayout_pagination } = useAppSelector(baseLayout_selector)

  const fetchListBaseLayout = useCallback(async (params: IRequestParamsGetBaseLayout) => {
    dispatch(baseLayout_fetchList(params))
  }, [])

  const onScrollEndReached = useCallback(() => {
    if (baseLayout_pagination.lastPage > baseLayout_pagination.currentPage) {
      fetchListBaseLayout({ paginate: true, page: baseLayout_pagination.currentPage + 1 })
    }
  }, [baseLayout_pagination.lastPage, baseLayout_pagination.currentPage])

  useFocusEffect(
    useCallback(() => {
      dispatch
      fetchListBaseLayout({ paginate: true })
    }, [])
  )

  console.log('baseLayout_pagination', baseLayout_pagination)
  renderCount += 1

  return (
    <Fragment>
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
          <FlashList
            data={baseLayout_listData}
            estimatedItemSize={200}
            keyExtractor={item => String(item.id)}
            onEndReached={onScrollEndReached}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 20, paddingHorizontal: themeConfig.horizontalSpacing }}
            renderItem={({ item }) => <BaseLayoutCardItem item={item} />}
          />
        </View>
      </Screen>
      {__DEV__ && <RenderCounter renderCount={renderCount} />}
    </Fragment>
  )
}

export default BaseLayoutListScreen
