import { useCallback, useMemo, useRef, useState, memo, useEffect } from 'react'
import { View, StyleSheet, Pressable, BackHandler } from 'react-native'
import { IDropdown } from '@/interfaces'
import {
  TEXT_FIELD_EXTRA_LARGE_HEIGHT,
  TEXT_FIELD_LARGE_HEIGHT,
  TEXT_FIELD_MEDIUM_HEIGHT,
  TEXT_FIELD_SMALL_HEIGHT,
  TextFieldProps,
} from '@/components/core/text-field/text-field'
import { createSpacing, themeHelpers } from '@/helpers'
import { themeConfig } from '@/config'
import { Typography } from '../typography'
import { useTheme } from '@/hooks'
import { grey, red } from '@/libs'
import { BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { bottomSheetStyles } from '@/components/base/base-bottom-sheet/base-bottom-sheet.styles'
import BaseBottomSheetBackdrop from '@/components/base/base-bottom-sheet/base-bottom-sheet-backdrop'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheetDropdownItem from './bottom-sheet-dropdown-item'
import { paletteLibs } from '@/libs/palette/_palette.lib'
import { MaterialIcon, Button } from '@/components/core'
import { screenUtils } from '@/utilities'
import { useNavigation } from '@react-navigation/native'

interface BottomSheetDropdownProps<T> {
  value: T | Array<T>
  multiple?: boolean
  onChange: (val: T | Array<T>) => void
  options: Array<IDropdown<T>>
  size?: TextFieldProps['size']
  variant?: TextFieldProps['variant']
  placeholder?: string
  label?: TextFieldProps['label']
  labelSize?: TextFieldProps['labelSize']
  labelStyle?: TextFieldProps['labelStyle']
  rounded?: TextFieldProps['rounded']
  isError?: TextFieldProps['isError']
  helperText?: TextFieldProps['helperText']
  isValid?: TextFieldProps['isValid']
  margin?: TextFieldProps['margin']
  style?: TextFieldProps['style']
  disabled?: boolean
  enableSearch?: boolean
  closeAfterSelect?: boolean
  bottomSheetHeight?: number
  fullScreen?: boolean
}

const SPACING_HORIZONTAL = 6
const CLOSE_ANIMATION_SPEED = 200

const BottomSheetDropdown = <T extends unknown>(props: BottomSheetDropdownProps<T>) => {
  const {
    value,
    multiple,
    onChange: propOnChange,
    options,
    size,
    variant,
    placeholder,
    label,
    labelSize,
    labelStyle,
    rounded,
    enableSearch,
    closeAfterSelect,
    disabled,
    isError,
    helperText,
    isValid,
    margin,
    bottomSheetHeight,
    fullScreen,
    style,
  } = props
  const theme = useTheme()
  const navigation = useNavigation()

  const ref = useRef<BottomSheetModal>(null)

  const insets = useSafeAreaInsets()

  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const snapPoints = useMemo(() => [fullScreen ? screenUtils.height + insets.top : bottomSheetHeight], [])

  const onBottomSheetChange = useCallback(
    (index: number) => {
      if (index < 0) {
        setIsFocused(false)
        setIsOpen(false)
      }
    },
    [ref.current, isOpen]
  )

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BaseBottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    []
  )

  const onOpenBottomSheet = useCallback(() => {
    setIsFocused(true)
    setIsOpen(true)
    ref?.current?.present()
  }, [ref.current, isOpen])

  const onPressFinish = useCallback(() => {
    setIsFocused(false)
    ref.current?.close()
  }, [])

  const selectedSingleValue = useMemo<string | null>(() => {
    if (!multiple) {
      return options.find(x => x.value === value)?.label as string
    }
    return null
  }, [options, value, multiple])

  const selectedMultiValue = useMemo<Array<IDropdown<T>>>(() => {
    let _values: Array<IDropdown<T>> = []
    if (multiple && Array.isArray(value) && value.length > 0) {
      for (let index = 0; index < value.length; index++) {
        const find = options.find(x => x.value === value[index])
        if (find) {
          _values.push(find)
        }
      }
    }
    return _values
  }, [options, value, multiple])

  const onPressDropdownItem = useCallback(
    (val: T) => {
      if (typeof propOnChange === 'function') {
        if (multiple) {
          const currentValues = value as Array<T>
          if (currentValues.find(x => x === (val as string | number))) {
            propOnChange(currentValues.filter(x => x !== val) as Array<T>)
          } else {
            propOnChange([...currentValues, val] as unknown as Array<T>)
          }
        } else {
          propOnChange(options.find(x => x.value === val)?.value as T)
        }
      }

      if (closeAfterSelect && !multiple) {
        ref.current?.dismiss({
          duration: CLOSE_ANIMATION_SPEED,
          overshootClamping: false,
        })
      }
    },
    [closeAfterSelect, multiple, value]
  )

  useEffect(() => {
    const onBackPress = () => {
      ref.current?.dismiss({
        duration: CLOSE_ANIMATION_SPEED,
        overshootClamping: false,
      })
      if (isOpen) {
        return true
      } else {
        return false
      }
    }
    // Subscribe when we come to life
    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    // Unsubscribe when we're done
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [isOpen, navigation])

  console.log('>>> RENDER ME')

  return (
    <>
      <Pressable onPress={onOpenBottomSheet}>
        <View
          style={StyleSheet.flatten([
            styles.root, // prettier-ignore
            { ...(margin === 'none' && { marginBottom: 0 }) },
            // prettier-ignore
            {...(margin === 'dense' && { marginBottom: themeHelpers.createSpacing(2) })},
            // prettier-ignore
            {...(margin === 'normal' && { marginBottom: themeHelpers.createSpacing(3) })},
          ])}
        >
          {/* --- input label --- */}
          {label && (
            <Typography
              style={StyleSheet.flatten([
                styles.label,
                { ...(labelSize === 'small' && styles.label_small) },
                { ...(labelSize === 'medium' && styles.label_medium) },
                { ...(labelSize === 'large' && styles.label_large) },
                {
                  color: theme.palette.text.secondary,
                  ...labelStyle,
                },
              ])}
            >
              {label}
            </Typography>
          )}
          <View
            style={StyleSheet.flatten([
              styles.container,
              // rounded
              // prettier-ignore
              { ...(rounded && size === 'small' && { borderRadius: TEXT_FIELD_SMALL_HEIGHT }) },
              // prettier-ignore
              { ...(rounded && size === 'medium' && { borderRadius: TEXT_FIELD_MEDIUM_HEIGHT }) },
              // prettier-ignore
              { ...(rounded && size === 'large' && { borderRadius: TEXT_FIELD_LARGE_HEIGHT }) },
              // prettier-ignore
              { ...(rounded && size === 'extra-large' && { borderRadius: TEXT_FIELD_EXTRA_LARGE_HEIGHT }) },

              { ...(size === 'small' && styles.dropdown_small) },
              { ...(size === 'medium' && styles.dropdown_medium) },
              { ...(size === 'large' && styles.dropdown_large) },
              { ...(size === 'extra-large' && styles.dropdown_extraLarge) },

              // styles for variant outlined

              // prettier-ignore
              {...(variant === 'outlined' && disabled && {
                backgroundColor: theme.palette.background.default,
                borderColor: theme.palette.divider,
              })},

              // Styles for variant outlined disabled.
              // prettier-ignore
              { ...(variant === 'outlined' && !disabled && {
                backgroundColor: theme.palette.background.paper,
                borderColor: !theme.isDarkMode ? grey[200] : grey[900],
                color: theme.palette.text.disabled,
              })},

              // Styles for variant outlined focused.
              // prettier-ignore
              {...(isFocused && variant === 'outlined' && { borderColor: theme.palette.primary.main })},

              // Styles for variant outlined error.
              // prettier-ignore
              {...(variant === 'outlined' && isError && {
                borderColor: red[500],
                color: red[600],
              })},

              // Styles for variant outlined error focused
              // prettier-ignore
              {...(isFocused && variant === 'outlined' && isError && {
                borderColor: red[500],
                color: red[600],
              })},

              // Styles for variant outlined invalid.
              // prettier-ignore
              {...(variant === 'outlined' && isValid && {
                borderColor: theme.palette.success.main,
                color: theme.palette.success.dark,
              })},

              // Styles for variant filled
              // prettier-ignore
              {...(variant === 'filled' && {
                backgroundColor: !theme.isDarkMode ? '#efefef' : grey[900],
                borderColor: !theme.isDarkMode ? '#efefef' : grey[900], 
              })},

              // Styles for variant filled disabled.
              // prettier-ignore
              {...(variant === 'filled' && !disabled && {
                backgroundColor: !theme.isDarkMode ? grey[200] : grey[800],
                borderColor: !theme.isDarkMode ? grey[200] : grey[800],
                color: theme.palette.text.disabled,
              })},

              // Styles for variant filled error.
              // prettier-ignore
              {...(variant === 'filled' && isError && {
                backgroundColor: 'rgba(255, 0, 0, 0.05)',
                borderColor: red[500],
                color: red[600],
              })},

              // Styles for variant filled invalid.
              // prettier-ignore
              {...(variant === 'filled' && isValid && {
                backgroundColor: theme.palette.success.light,
                borderColor: theme.palette.success.main,
                color: theme.palette.success.dark,
              })},

              { ...style },
            ])}
          >
            {multiple ? (
              <View
                style={StyleSheet.flatten([
                  styles.multipleSelectionItemContainer,
                  {
                    ...(selectedMultiValue.length > 0 && {
                      paddingVertical: 6,
                    }),
                  },
                ])}
              >
                {selectedMultiValue.length > 0 ? (
                  <>
                    {selectedMultiValue.map((x, index) => (
                      <View
                        key={String(x.value) + String(index)}
                        style={StyleSheet.flatten([
                          styles.selectionValue,
                          {
                            ...(theme.isDarkMode
                              ? { backgroundColor: paletteLibs.grey[900] }
                              : { backgroundColor: paletteLibs.grey[200] }),
                          },
                        ])}
                      >
                        <Typography color='text.primary' fontWeight='500' style={styles.selectionValueText} numberOfLines={1}>
                          {x.label}
                        </Typography>
                      </View>
                    ))}
                  </>
                ) : (
                  <Typography
                    color='text.disabled'
                    fontWeight='500'
                    style={StyleSheet.flatten([
                      styles.dropdownText,
                      // text style
                      { ...(size === 'small' && styles.dropdownText_small) },
                      { ...(size === 'medium' && styles.dropdownText_medium) },
                      { ...(size === 'large' && styles.dropdownText_large) },
                      { ...(size === 'extra-large' && styles.dropdownText_extraLarge) },
                    ])}
                  >
                    {placeholder ?? ''}
                  </Typography>
                )}
              </View>
            ) : (
              <>
                {selectedSingleValue ? (
                  <Typography
                    color='text.primary'
                    fontWeight='500'
                    numberOfLines={1}
                    style={StyleSheet.flatten([
                      styles.dropdownText,
                      // text style
                      { ...(size === 'small' && styles.dropdownText_small) },
                      { ...(size === 'medium' && styles.dropdownText_medium) },
                      { ...(size === 'large' && styles.dropdownText_large) },
                      { ...(size === 'extra-large' && styles.dropdownText_extraLarge) },
                    ])}
                  >
                    {selectedSingleValue}
                  </Typography>
                ) : (
                  <Typography
                    color='text.disabled'
                    fontWeight='500'
                    style={StyleSheet.flatten([
                      styles.dropdownText,
                      // text style
                      { ...(size === 'small' && styles.dropdownText_small) },
                      { ...(size === 'medium' && styles.dropdownText_medium) },
                      { ...(size === 'large' && styles.dropdownText_large) },
                      { ...(size === 'extra-large' && styles.dropdownText_extraLarge) },
                    ])}
                  >
                    {placeholder ?? ''}
                  </Typography>
                )}
              </>
            )}

            {/* arrow icon */}
            <View style={styles.arrowIcon}>
              <MaterialIcon style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }} name='keyboard-arrow-down' size={20} />
            </View>
          </View>
          {/* --- Helper text --- */}
          {helperText && (
            <Typography
              style={StyleSheet.flatten([
                styles.helperText,
                {
                  color: isError ? red[500] : theme.palette.text.secondary,
                },
              ])}
              variant='subtitle2'
            >
              {helperText}
            </Typography>
          )}
        </View>
      </Pressable>
      <BottomSheetModal
        ref={ref}
        index={0}
        name='bottom_sheet_dropdown'
        stackBehavior='push'
        enableDismissOnClose={true}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints as Array<number>}
        enablePanDownToClose={true}
        style={StyleSheet.flatten([bottomSheetStyles.bottomSheet_root])}
        handleIndicatorStyle={bottomSheetStyles.bottomSheet_handleIndicatorStyle}
        backgroundStyle={StyleSheet.flatten([
          bottomSheetStyles.bottomSheet_backgroundStyle,
          {
            backgroundColor: theme.palette.background.paper,
            borderRadius: fullScreen ? 0 : themeConfig.shape.borderRadius * 4,
          },
        ])}
        onChange={onBottomSheetChange}
      >
        {enableSearch && <BottomSheetTextInput style={styles.searchInput} />}
        {options.length > 0 && (
          <BottomSheetFlatList
            data={options}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => {
              return (
                <BottomSheetDropdownItem
                  onPress={() => onPressDropdownItem(item.value)}
                  selected={
                    multiple
                      ? Boolean(Array.isArray(value) && value.length > 0 && value.find(v => v === item.value))
                      : value === item.value
                  }
                  title={item.label}
                  subtitle={undefined}
                  disabled={false}
                  horizontalSpacing={SPACING_HORIZONTAL}
                />
              )
            }}
          />
        )}
        {multiple && (
          <View style={{ marginBottom: insets.bottom + 20, width: 200, alignSelf: 'center' }}>
            <Button onPress={onPressFinish} size='large' variant='contained' title='Finish' />
          </View>
        )}
      </BottomSheetModal>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  container: {
    borderWidth: 1.3,
    borderRadius: themeConfig.shape.borderRadius,
    justifyContent: 'center',
  },
  dropdown_small: {
    minHeight: TEXT_FIELD_SMALL_HEIGHT,
    paddingHorizontal: themeHelpers.createSpacing(3),
  },
  dropdown_medium: {
    minHeight: TEXT_FIELD_MEDIUM_HEIGHT,
    paddingHorizontal: themeHelpers.createSpacing(3.6),
  },
  dropdown_large: {
    minHeight: TEXT_FIELD_LARGE_HEIGHT,
    paddingHorizontal: themeHelpers.createSpacing(4.4),
  },
  dropdown_extraLarge: {
    minHeight: TEXT_FIELD_EXTRA_LARGE_HEIGHT,
    paddingHorizontal: themeHelpers.createSpacing(4.4),
  },
  dropdownText: {
    width: '100%',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
  },
  dropdownText_small: {
    height: TEXT_FIELD_SMALL_HEIGHT,
    verticalAlign: 'middle',
    fontSize: 12.2,
  },
  dropdownText_medium: {
    fontSize: 13.8,
  },
  dropdownText_large: {
    fontSize: 15.2,
  },
  dropdownText_extraLarge: {
    verticalAlign: 'middle',
    fontSize: 16.2,
  },

  bottomSheetLabelTitle: {
    textAlign: 'center',
  },

  label: {
    marginBottom: themeHelpers.createSpacing(1),
  },
  label_small: {
    fontSize: 11,
  },
  label_medium: {
    fontSize: 13,
  },
  label_large: {
    fontSize: 15,
  },
  helperText: {
    marginLeft: themeHelpers.createSpacing(2),
    fontWeight: themeConfig.typography.body1.fontWeightMedium,
  },
  searchInput: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },

  multipleSelectionItemContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  selectionValue: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    margin: 2,
  },
  selectionValueText: {},
  arrowIcon: {
    position: 'absolute',
    right: createSpacing(2),
    justifyContent: 'center',
    height: 40,
  },
})

BottomSheetDropdown.defaultProps = {
  options: [],
  multiple: false,
  size: 'medium',
  margin: 'normal',
  variant: 'outlined',
  rounded: false,
  color: 'primary',
  labelSize: 'small',
  editable: true,
  isError: false,
  isValid: false,
  helperText: undefined,
  multiline: false,
  bottomSheetHeight: 400,
  enableSearch: false,
  closeAfterSelect: false,
  fullScreen: false,
}

export default memo(BottomSheetDropdown)
