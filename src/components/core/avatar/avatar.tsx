import React, { FC } from 'react'
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native'

// Core components
import { Typography } from '@/components/core'

// Icons components
import { Ionicon } from '@/components/core/icons'

// Interfaces
import { ThemeSize } from '@/interfaces'

// theme config
import { theme_paletteBase } from '@/configs'

// utils
import { commonUtils } from '@/utilities'
import { useTheme } from '@/hooks'

export interface AvatarProps {
  type?: 'image' | 'text'
  source?: ImageSourcePropType | string
  text?: string
  size?: ThemeSize | number
  textSize?: number
  color?: 'primary' | 'secondary' | string
  style?: ViewStyle
}

const AVATAR_SIZES = {
  SMALL: 32,
  MEDIUM: 36,
  LARGE: 44,
}

const Avatar: FC<AvatarProps> = props => {
  const { type, source, text, size, textSize, color, style, ...rest } = props
  const theme = useTheme()
  return (
    <View
      {...rest}
      style={StyleSheet.flatten([
        styles.avatar_root,
        {
          /* 👇👇👇 Styles height and width avatar root view  👇👇👇 */
          ...(size === 'small' && {
            height: AVATAR_SIZES.SMALL,
            width: AVATAR_SIZES.SMALL,
          }),
          ...(size === 'medium' && {
            height: AVATAR_SIZES.MEDIUM,
            width: AVATAR_SIZES.MEDIUM,
          }),
          ...(size === 'large' && {
            height: AVATAR_SIZES.LARGE,
            width: AVATAR_SIZES.LARGE,
          }),

          ...(typeof size === 'number' && {
            height: size,
            width: size,
          }),

          /* 👇👇👇 Styles avatar color 👇👇👇 */
          ...(color !== 'primary' && color !== 'secondary'
            ? {
                backgroundColor: color,
              }
            : {
                backgroundColor: color === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main,
              }),

          // Style props
          ...style,
        },
      ])}
    >
      {type === 'image' && source ? (
        <Image
          source={source as ImageSourcePropType}
          style={StyleSheet.flatten([
            styles.avatar_root,
            styles.avatar_image,
            {
              /* 👇👇👇 Styles height & width avatar image  👇👇👇 */
              ...(size === 'small' && {
                height: AVATAR_SIZES.SMALL,
                width: AVATAR_SIZES.SMALL,
              }),
              ...(size === 'medium' && {
                height: AVATAR_SIZES.MEDIUM,
                width: AVATAR_SIZES.MEDIUM,
              }),
              ...(size === 'large' && {
                height: AVATAR_SIZES.LARGE,
                width: AVATAR_SIZES.LARGE,
              }),

              ...(typeof size === 'number' && {
                height: size,
                width: size,
              }),
            },
          ])}
        />
      ) : text ? (
        <Typography
          style={StyleSheet.flatten([
            styles.avatar_text,
            {
              ...(textSize && {
                fontSize: textSize,
              }),
            },
          ])}
        >
          {text.length > 3 ? commonUtils.getInitialsName(text, true) : text}
        </Typography>
      ) : (
        <Ionicon name='person' size={22} color={theme_paletteBase.secondary.contrastText} />
      )}
    </View>
  )
}

Avatar.defaultProps = {
  size: 'medium',
  color: 'secondary',
  type: 'image',
  text: undefined,
  textSize: undefined,
}

const styles = StyleSheet.create({
  avatar_root: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar_image: {
    resizeMode: 'cover',
  },
  avatar_text: {
    color: theme_paletteBase.primary.contrastText,
    marginTop: -2, // issue line height font Plus Jakarta Sans
  },
})

export default Avatar
