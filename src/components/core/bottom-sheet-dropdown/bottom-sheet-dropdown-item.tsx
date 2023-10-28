import React, { FC, ReactElement, ReactNode, useCallback, useMemo, memo } from 'react'
import { StyleSheet, View, ColorValue, TextStyle, ViewStyle, Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

// Core components
import { Typography } from '@/components/core'

// Hooks
import { useTheme } from '@/hooks'

// Utils
import { RNVectorIconProvider } from '@/interfaces'
import { themeConfig } from '@/config'
import { createSpacing } from '@/helpers'

export interface BottomSheetDropdownItemProps {
  title: string
  subtitle?: string
  disabled?: boolean
  selected?: boolean
  rightContent?: ReactNode
  onPress: () => void
  textColor?: ColorValue
  textStyle?: TextStyle
  icon?: ReactElement | ReactNode
  iconProvider?: RNVectorIconProvider
  iconSize?: number
  iconSpacing?: number
  horizontalSpacing?: number
  style?: ViewStyle
}

const BottomSheetDropdownItem: FC<BottomSheetDropdownItemProps> = props => {
  const {
    title,
    subtitle,
    disabled,
    selected,
    rightContent,
    onPress: propsOnPress,
    textColor,
    textStyle,
    horizontalSpacing,
    style,
  } = props
  const theme = useTheme()

  const getColor = useMemo(() => {
    if (selected) {
      return theme.palette.primary.main
    }
    return textColor ?? theme.palette.text.primary
  }, [textColor, selected])

  const onPress = () => {
    if (typeof propsOnPress === 'function') {
      propsOnPress()
    }
  }

  const onCheckboxChange = useCallback(() => {
    onPress()
  }, [selected])

  return (
    <Pressable
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.root,

          // prettier-ignore
          {...(!pressed && {
            backgroundColor: theme.palette.background.paper,
          })},

          // prettier-ignore
          {...(pressed && {
              backgroundColor: theme.palette.action.hover,
          })},

          /** Style props */
          { ...style },
        ])
      }
      onPress={onPress}
    >
      <View
        style={StyleSheet.flatten([
          styles.touchableInner,
          {
            paddingHorizontal: Number(horizontalSpacing) * themeConfig.spacing,
          },
        ])}
      >
        <View style={styles.content}>
          <CheckBox
            style={{ marginRight: createSpacing(4), borderColor: 'red', width: 22, height: 22 }}
            boxType='square'
            disabled={disabled}
            value={selected}
            onChange={onCheckboxChange}
            onCheckColor={theme.palette.primary.main}
            onTintColor={theme.palette.primary.main}
            tintColor={theme.palette.text.disabled}
            lineWidth={3}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <View style={styles.rightContent}>{rightContent && rightContent}</View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {},
  touchableInner: {
    flexGrow: 1,
    minHeight: 48,
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
  rightContent: {
    marginLeft: 'auto',
    width: 60,
    marginRight: -5,
  },
  textStyle: {
    fontSize: 15,
    lineHeight: 20,
  },
  subtitle: {
    lineHeight: 14,
  },
})

BottomSheetDropdownItem.defaultProps = {
  subtitle: '',
  selected: false,
  rightContent: undefined,
  iconProvider: 'ionicons',
  iconSize: 22,
  iconSpacing: 24,
  horizontalSpacing: 4,
}

export default memo(BottomSheetDropdownItem)
