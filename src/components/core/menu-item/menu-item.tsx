import React, { FC, ReactElement, ReactNode, useMemo } from 'react'
import { StyleSheet, View, TouchableNativeFeedback, Switch, ColorValue, TextStyle, ViewStyle } from 'react-native'

// Core components
import { Typography, Icon } from '@/components/core'

// Hooks
import { useTheme } from '@/hooks'

// Theme libs
import { grey } from '@/libs'

// Utils
import { RNVectorIconProvider } from '@/interfaces'
import { themeConfig, theme_paletteLight } from '@/configs'

export interface MenuItemProps {
  title: string
  subtitle?: string
  active?: boolean
  enableSwitch?: boolean
  switchValue?: boolean
  onPress?: () => void
  textColor?: ColorValue
  textStyle?: TextStyle
  icon?: ReactElement | ReactNode
  iconProvider?: RNVectorIconProvider
  iconSize?: number
  iconSpacing?: number
  horizontalSpacing?: number
  style?: ViewStyle
}

const MenuItem: FC<MenuItemProps> = ({
  title,
  subtitle,
  active,
  enableSwitch,
  switchValue,
  onPress,
  textColor,
  textStyle,
  icon,
  iconProvider,
  iconSize,
  iconSpacing,
  horizontalSpacing,
  style,
}) => {
  const theme = useTheme()

  const [rippleColor] = useMemo(() => {
    return theme.palette.mode === 'dark' ? '#333333' : theme_paletteLight.action.focus
  }, [theme.palette.mode])

  const getColor = useMemo(() => {
    if (active) {
      return theme.palette.primary.main
    }
    return textColor ?? theme.palette.text.primary
  }, [textColor, active])

  const getIconColor = useMemo(() => {
    if (active) {
      return theme.palette.primary.main
    }
    return textColor ?? theme.palette.text.secondary
  }, [textColor, active])

  return (
    <View style={StyleSheet.flatten([styles.root, { ...style }])}>
      <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple(rippleColor, false)}>
        <View
          style={StyleSheet.flatten([
            styles.touchableInner,
            {
              paddingHorizontal: Number(horizontalSpacing) * themeConfig.spacing,
            },
          ])}
        >
          <View style={styles.content}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name={icon as string}
                provider={iconProvider as RNVectorIconProvider}
                size={iconSize}
                style={{ marginRight: iconSpacing, color: getIconColor }}
              />
              <View style={styles.textContainer}>
                <Typography
                  numberOfLines={1}
                  gutterBottom={0.5}
                  fontWeight='500'
                  style={StyleSheet.flatten([
                    styles.textStyle,
                    {
                      color: getColor,
                      ...textStyle,
                    },
                  ])}
                >
                  {title}
                </Typography>
                {subtitle && (
                  <Typography
                    numberOfLines={2} // please keep 2 lines
                    variant='subtitle1'
                    style={StyleSheet.flatten([styles.subtitle, { color: textColor ?? theme.palette.text.secondary }])}
                  >
                    {subtitle}
                  </Typography>
                )}
              </View>
              <View style={styles.switchContainer}>
                {enableSwitch && (
                  <Switch
                    trackColor={{
                      false: grey[400],
                      true: theme.palette.primary.main,
                    }}
                    thumbColor={switchValue ? theme.palette.primary.light : '#f4f3f4'}
                    ios_backgroundColor={theme.palette.divider}
                    onValueChange={onPress}
                    value={switchValue}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  touchableInner: {
    flexGrow: 1,
    minHeight: 46,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  switchContainer: {
    marginLeft: 'auto',
    width: 60,
    marginRight: -5,
  },
  textStyle: {
    lineHeight: 20,
    fontSize: 14.5,
  },
  subtitle: {
    lineHeight: 14,
  },
})

MenuItem.defaultProps = {
  subtitle: '',
  active: false,
  enableSwitch: false,
  switchValue: false,
  iconProvider: 'ionicons',
  iconSize: 22,
  iconSpacing: 24,
  horizontalSpacing: 4,
}

export default MenuItem
