import { FC, useMemo, memo } from 'react'
import { StyleSheet, View } from 'react-native'

// core components
import { Icon, Typography } from '@/components/core'

// hooks
import { useTheme } from '@/hooks'

// helpers / utils
import { screenUtils } from '@/utilities'
import { createSpacing } from '@/helpers'

// drop shadow
import DropShadow from 'react-native-drop-shadow'

// interfaces
import { IToastShowParams } from '@/interfaces'

// theme config
import { themeConfig } from '@/config'

export interface ToastProps extends IToastShowParams {}

const Toast: FC<ToastProps> = props => {
  const { type, variant } = props
  const theme = useTheme()

  const hasSubtitle = useMemo(() => Boolean(props.text2), [props.text2])

  const fillColor = useMemo(() => {
    if (type === 'success' || type === 'success_filled') {
      return variant === 'filled' ? theme.palette.success.main : theme.palette.success.dark
    } else if (type === 'error' || type === 'error_filled') {
      return variant === 'filled' ? theme.palette.error.main : theme.palette.error.dark
    } else if (type === 'info' || type === 'info_filled') {
      return variant === 'filled' ? theme.palette.info.main : theme.palette.info.dark
    } else if (type === 'warning' || type === 'warning_filled') {
      return variant === 'filled' ? theme.palette.warning.main : theme.palette.warning.dark
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
    if (type.includes('success')) {
      return 'checkmark-done-circle'
    } else if (type.includes('error')) {
      return 'close-circle'
    } else if (type.includes('info')) {
      return 'information-circle-sharp'
    } else if (type.includes('warning')) {
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
        size={hasSubtitle ? 20 : 22}
        style={{ marginRight: createSpacing(2) }}
      />
    )
  }

  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.18,
        shadowRadius: 10,
      }}
    >
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
    </DropShadow>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1.2,
    maxWidth: screenUtils.width / 1.2,
  },
  withSubtitle: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  withoutSubtitle: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textContainer: {},
  textTitle: {
    lineHeight: 18,
  },
  textSubtitle: {
    fontSize: 12.2,
    lineHeight: 16,
  },
})

Toast.defaultProps = {
  variant: 'default',
}

export default memo(Toast)
