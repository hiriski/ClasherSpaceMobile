import React, { FC, ReactNode } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

// core components
import { Typography } from '@/components/core'

// hooks
import { useNavigation } from '@react-navigation/native'

// utils

// interfaces
import { ThemeSize } from '@/interfaces'
import { themeConfig, theme_paletteLight, theme_spacing } from '@/configs'
import { ColorValue } from 'react-native'

export interface ScreenTitleProps {
  title: string
  titleSize?: ThemeSize
  fontWeight?: TextStyle['fontWeight']
  titleColor?: ColorValue
  backgroundColor?: ColorValue
  leftContent?: ReactNode
  rightContent?: ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  gutterBottom?: number
  horizontalSpacing?: number
}

const ScreenTitle: FC<ScreenTitleProps> = (props): JSX.Element => {
  const {
    title,
    titleSize,
    fontWeight,
    titleColor,
    backgroundColor,
    leftContent,
    rightContent,
    style,
    textStyle,
    gutterBottom,
    horizontalSpacing,
  } = props
  const navigation = useNavigation()

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        {
          marginBottom: Number(gutterBottom) * theme_spacing,
          paddingHorizontal: Number(horizontalSpacing) * theme_spacing,
          backgroundColor,
          ...style,
        },
      ])}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {leftContent}
        <Typography
          numberOfLines={1}
          fontWeight={fontWeight}
          style={StyleSheet.flatten([
            styles.title,
            { color: titleColor },
            titleSize === 'small' && styles.title_small,
            titleSize === 'medium' && styles.title_medium,
            titleSize === 'large' && styles.title_large,
            { ...textStyle },
          ])}
        >
          {title}
        </Typography>
        <View style={styles.rightContent}>{rightContent}</View>
      </View>
    </View>
  )
}

ScreenTitle.defaultProps = {
  titleSize: 'medium',
  fontWeight: themeConfig.typography.h1.fontWeightBold,
  titleColor: theme_paletteLight.text.primary,
  gutterBottom: 0,
  horizontalSpacing: 6,
}

const styles = StyleSheet.create({
  root: {
    height: 52,
    justifyContent: 'center',
  },
  title: {},
  title_small: {
    fontSize: 17,
    lineHeight: 24,
  },
  title_medium: {
    fontSize: 20,
    lineHeight: 28,
  },
  title_large: {
    fontSize: 24,
    lineHeight: 32,
  },
  rightContent: {
    marginLeft: 'auto',
  },
})

export default ScreenTitle
