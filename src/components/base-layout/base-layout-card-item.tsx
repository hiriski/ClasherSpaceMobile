import { Assets } from '@/assets'
import { FC, useCallback } from 'react'
import { Image, StyleSheet, View, Linking } from 'react-native'
import { Button, Card, IconButton, Ionicon, Typography } from '@/components/core'
import FastImage from 'react-native-fast-image'
import { Pressable } from 'react-native'

interface Props {
  item: IBaseLayout
}

const IMAGE_HEIGH = 180
const SHAPE_RADIUS = 8

const BaseLayoutCardItem: FC<Props> = ({ item }) => {
  const { name, link, builderHallLevel, imageUrls } = item

  const onPressCopy = useCallback(() => {
    Linking.openURL(link)
  }, [link])

  const onThumbnailPress = useCallback(() => {
    Linking.openURL(link)
  }, [link])

  return (
    <Card style={{ marginBottom: 20, borderRadius: SHAPE_RADIUS }} px={3} py={3}>
      <Pressable onPress={onThumbnailPress} style={({ pressed }) => StyleSheet.flatten([styles.thumbnailContainer])}>
        {imageUrls?.length > 0 ? (
          <FastImage
            style={{ width: '100%', height: IMAGE_HEIGH, borderRadius: SHAPE_RADIUS - 2 }}
            defaultSource={Assets.placeholder}
            source={{
              uri: imageUrls[0] as string,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Image source={Assets.placeholder} style={{ width: '100%', height: IMAGE_HEIGH, borderRadius: SHAPE_RADIUS - 2 }} />
        )}
      </Pressable>

      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant='subtitle2'>{builderHallLevel ? 'BH Level' : 'TH Level'}</Typography>
            <Typography variant='subtitle2'>{builderHallLevel ? item.builderHallLevel : item.townHallLevel}</Typography>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Typography variant='subtitle2'>Category</Typography>
            <Typography variant='subtitle2'>{item.categories.map(x => x)}</Typography>
          </View>
          <Typography variant='h5' fontWeight='bold' style={{}} numberOfLines={1}>
            {name}
          </Typography>
        </View>
        <View style={styles.rightContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicon name='download-outline' size={15} />
            <Typography variant='subtitle2' style={{ marginLeft: 4 }}>
              {item.views}
            </Typography>
          </View>
          <IconButton
            onPress={onPressCopy}
            icon='navigate-outline'
            iconType='ionicons'
            variant='contained'
            color='primary'
            iconSize={18}
          />
        </View>
        {/* <Button onPress={onPressCopy} title='Copy' startIcon='navigate-outline' iconType='ionicons' rounded size='small' /> */}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  root: {},
  thumbnailContainer: {
    height: IMAGE_HEIGH,
    width: '100%',
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  rightContent: {
    marginLeft: 14,
    alignItems: 'center',
  },
})

export default BaseLayoutCardItem
