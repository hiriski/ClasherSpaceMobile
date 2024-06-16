import { FC, useMemo, memo } from 'react'
import { StyleSheet, View } from 'react-native'

// core components
import { Icon, Typography } from '@/components/core'

// hooks
import { useTheme } from '@/hooks'

// helpers / utils
import { screenUtils } from '@/utilities'
import { createSpacing } from '@/helpers'

// interfaces
import { ToastShowParams } from 'react-native-toast-message'

// theme config
import { themeConfig } from '@/configs'
import { ToastType, ToastVariant } from '@/interfaces'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface ToastProps extends ToastShowParams {
  type: ToastType
  props: {
    fullWidth: boolean
    variant: ToastVariant
  }
}

const Toast: FC<ToastProps> = props => {
  const { type } = props
  const { fullWidth, variant } = props.props
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  const hasSubtitle = useMemo(() => Boolean(props.text2), [props.text2])

  const fillColor = useMemo(() => {
    if (type === 'success') {
      return theme.palette.success.main
    } else if (type === 'error') {
      return theme.palette.error.main
    } else if (type === 'info') {
      return theme.palette.info.main
    } else if (type === 'warning') {
      return theme.palette.warning.main
    } else if (type === 'light') {
      return themeConfig.paletteLight.background.paper
    } else if (type === 'dark') {
      return theme.palette.text.primary
    } else {
      return theme.palette.text.primary
    }
  }, [theme.isDarkMode, type, variant])

  const textColor = useMemo(() => {
    if (type.includes('success')) {
      return variant === 'filled' ? theme.palette.success.contrastText : theme.palette.success.dark
    } else if (type.includes('error')) {
      return variant === 'filled' ? theme.palette.error.contrastText : theme.palette.error.dark
    } else if (type.includes('info')) {
      return variant === 'filled' ? theme.palette.info.contrastText : theme.palette.info.dark
    } else if (type.includes('warning')) {
      return variant === 'filled' ? theme.palette.warning.contrastText : theme.palette.warning.dark
    } else if (type === 'light') {
      return themeConfig.paletteLight.text.primary
    } else if (type === 'dark') {
      return themeConfig.paletteDark.text.primary
    } else {
      return theme.palette.text.primary
    }
  }, [theme.isDarkMode, type, variant])

  const getIcon = () => {
    if (type === 'success') {
      return 'checkmark-done-circle'
    } else if (type === 'error') {
      return 'close-circle'
    } else if (type === 'info') {
      return 'information-circle-sharp'
    } else if (type === 'warning') {
      return 'warning'
    } else if (type === 'light') {
      return 'information-circle-sharp'
    } else {
      return 'information-circle-sharp'
    }
  }

  const renderIcon = () => {
    return (
      <Icon
        name={getIcon()}
        provider='ionicons'
        color={textColor}
        size={hasSubtitle ? 20 : 18}
        style={{ marginRight: createSpacing(1.5) }}
      />
    )
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        // prettier-ignore
        { ...(hasSubtitle ? styles.withSubtitle : styles.withoutSubtitle)},
        // prettier-ignore
        { ...(variant === 'default' && { backgroundColor: theme.palette.background.paper, borderColor: fillColor })},
        // prettier-ignore
        {...(variant === 'filled' && { backgroundColor: fillColor, borderColor: fillColor })},
        // prettier-ignore
        {...(type === 'dark' && { backgroundColor: themeConfig.paletteDark.background.paper })},
        // prettier-ignore
        {...(type === 'light' && { backgroundColor: themeConfig.paletteLight.background.paper })},

        { ...(!fullWidth && { maxWidth: screenUtils.width / 1.2 }) },
        // prettier-ignore
        {...(fullWidth && props.position === 'bottom' && {
          width: screenUtils.width,
          marginBottom: -12,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        })},
        // prettier-ignore
        {...(fullWidth && props.position === 'top' && {
          width: screenUtils.width,
          marginTop: -2,
          paddingTop: insets.top + 14,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        })},
      ])}
    >
      {type !== 'dark' && type !== 'light' && renderIcon()}
      <View
        style={StyleSheet.flatten([
          styles.textContainer,
          // prettier-ignore
          {...((type === 'dark' || type === 'light') && { marginHorizontal: 6 })},
        ])}
      >
        <Typography style={StyleSheet.flatten([styles.textTitle, { color: textColor }])} numberOfLines={2}>
          {props.text1}
        </Typography>
        {hasSubtitle && (
          <Typography style={StyleSheet.flatten([styles.textSubtitle, { color: textColor, opacity: 0.7 }])} numberOfLines={4}>
            {props.text2}
          </Typography>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1.2,
    elevation: 8,
    shadowColor: 'rgba(0,0,0,0.65)',
  },
  withSubtitle: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  withoutSubtitle: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 49,
  },
  fullWidthWithSubtitle: {},
  fullWidthWithoutSubtitle: {},
  textContainer: {},
  textTitle: {
    lineHeight: 18,
    fontSize: 13.2,
    fontWeight: themeConfig.typography.body1.fontWeightBold,
  },
  textSubtitle: {
    fontSize: 12.2,
    lineHeight: 16,
  },
})

Toast.defaultProps = {
  type: 'success',
  props: {
    variant: 'filled',
    fullWidth: false,
  },
}

export default memo(Toast)
