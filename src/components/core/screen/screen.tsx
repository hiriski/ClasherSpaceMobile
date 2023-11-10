import React, { Ref, ReactNode, useMemo } from 'react'

import { Dimensions, KeyboardAvoidingView, ScrollView, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ColorValue, StatusBarStyle, StyleProp } from 'react-native'

// components
import { StatusBar } from '@/components/core'
import { Typography } from '@/components/core'
import { ScreenTitle, ScreenTitleProps } from '@/components/core'

// hooks
import { useTheme } from '@/modules/theme/hooks'
import { platformUtils } from '@/modules/app/utilities'

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      flex: 1,
      height: '100%',
    } as ViewStyle,
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      height: '100%',
      width: '100%',
    } as ViewStyle,
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      flex: 1,
      height: '100%',
    } as ViewStyle,
    inner: { flexGrow: 1, alignItems: 'stretch' } as ViewStyle,
  },

  /**
   * No scrolling if content fits the screen, otherwise it scrolls.
   *
   * Pick this one if you are unsure your content will fit the screen or if you want to automatically adapt to screen size.
   *
   * Offset options can be applied to tweak scroll toggling so content may not overfit the screen.
   */
  auto: {
    // When using 'auto' the 'scroll' ViewStyles will apply.
    // outer: {} as ViewStyle,
    // inner: {} as ViewStyle,
    offset: {
      percent: 0.92, // Manipulates the height comparison by percentage values. For example, 0.92 enables scroll when the contents height reaches 92% of the screen.
      point: 0, // Same as above but offsets the scroll break point value by the density-independent pixels.
    } as const,
  },
}

/**
 * The variations of screens.
 */
export type ScreenPresets = keyof typeof presets

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset: ScreenPresets = 'scroll') {
  // any of these things will make you scroll
  return !preset || !presets[preset] || preset === 'fixed'
}

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets

  /**
   * An optional bounces effect when the scroll reaches the end of the scrollable area.
   */
  bounces?: boolean

  /**
   * An optional bounces effect horizontal scroll.
   */
  bounceHorizontal?: boolean

  /**
   * An optional bounces effect vertical scroll.
   */
  bounceVertical?: boolean

  /**
   * An optional background color
   */
  backgroundColor?: ColorValue

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBarStyle?: StatusBarStyle
  // statusBarColor?: ColorValue
  // statusBarInsets?: number
  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never'

  scrollViewRef?: Ref<ScrollView>

  loading?: boolean

  /**
   * Header props
   */
  title?: ScreenTitleProps['title']

  headerStyle?: ScreenTitleProps['style']

  titleSize?: ScreenTitleProps['titleSize']

  titleFontWeight?: ScreenTitleProps['fontWeight']

  titleColor?: ScreenTitleProps['titleColor']

  headerBackgroundColor?: ScreenTitleProps['backgroundColor']

  headerHorizontalSpacing?: ScreenTitleProps['horizontalSpacing']

  headerRightContent?: ScreenTitleProps['rightContent']

  headerLeftContent?: ScreenTitleProps['leftContent']
}

// const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}

  const backgroundStyle = {
    backgroundColor: props.backgroundColor ?? theme.palette.background.default,
  }

  const insetStyle = { paddingBottom: 0 } as ViewStyle

  const statusBarStyle = useMemo<StatusBarStyle>(() => {
    return props.statusBarStyle ?? theme.palette.mode === 'dark' ? 'light-content' : 'dark-content'
  }, [props.statusBarStyle, theme.palette.mode])

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={platformUtils.isIOS ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <View
        style={{
          height: insets.top,
          backgroundColor: props.headerBackgroundColor ?? 'transparent',
        }}
      />
      <StatusBar barStyle={statusBarStyle} translucent />
      {props.title && (
        <ScreenTitle
          title={props.title as string}
          style={props.headerStyle}
          titleSize={props.titleSize}
          fontWeight={props.titleFontWeight}
          titleColor={props.titleColor}
          backgroundColor={props.headerBackgroundColor}
          horizontalSpacing={props.headerHorizontalSpacing}
          leftContent={props.headerLeftContent}
          rightContent={props.headerRightContent}
        />
      )}
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}

  const backgroundStyle = {
    backgroundColor: props.backgroundColor ?? theme.palette.background.default,
  }
  const insetStyle = { paddingBottom: 0 } as ViewStyle

  const statusBarStyle = useMemo<StatusBarStyle>(() => {
    return props.statusBarStyle ?? theme.palette.mode === 'dark' ? 'light-content' : 'dark-content'
  }, [props.statusBarStyle, theme.palette.mode])

  // The followings for <Screen preset='auto'/>
  // This will automatically disables scrolling if content fits the screen.
  const { height } = Dimensions.get('window')
  const scrollViewHeight = React.useRef(null)
  const [scrollEnabled, setScrollEnabled] = React.useState(true)

  const updateScrollState = () => {
    if (props.preset === 'auto') {
      // check whether if content fits the screen
      // then toggle scroll state according to it
      const contentFitsScreen = scrollViewHeight.current < height * presets.auto.offset.percent - presets.auto.offset.point

      // content is less than the size of the screen, so we can disable scrolling
      if (scrollEnabled && contentFitsScreen) {
        setScrollEnabled(false)
      }

      // content is greater than the size of the screen, so let's enable scrolling
      if (!scrollEnabled && !contentFitsScreen) {
        setScrollEnabled(true)
      }
    } else if (!scrollEnabled) {
      // set back initial value in case it's stucked in a disabled state
      // i.e. if we've just changed preset from 'auto' to 'scroll'
      setScrollEnabled(true)
    }
  }

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // update scroll view height
    scrollViewHeight.current = contentHeight

    // then update scroll state
    updateScrollState()
  }

  // update scroll state on every render
  // when scrollViewHeight isn't null
  if (scrollViewHeight.current !== null) {
    updateScrollState()
  }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={platformUtils.isIOS ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={statusBarStyle} translucent />
      <View
        style={{
          height: insets.top,
          backgroundColor: props.headerBackgroundColor ?? 'transparent',
        }}
      />
      {props.title && (
        <ScreenTitle
          title={props.title as string}
          style={props.headerStyle}
          titleSize={props.titleSize}
          fontWeight={props.titleFontWeight}
          titleColor={props.titleColor}
          backgroundColor={props.headerBackgroundColor}
          horizontalSpacing={props.headerHorizontalSpacing}
          leftContent={props.headerLeftContent}
          rightContent={props.headerRightContent}
        />
      )}
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}
          onContentSizeChange={props.preset === 'auto' ? onContentSizeChange : undefined}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
          ref={props.scrollViewRef}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
const Screen = (props: ScreenProps) => {
  return (
    <>
      {props.loading && (
        <View>
          <Typography>Loading...</Typography>
        </View>
      )}
      {isNonScrolling(props.preset) ? <ScreenWithoutScrolling {...props} /> : <ScreenWithScrolling {...props} />}
    </>
  )
}

export default Screen
