import React, { FC, ReactNode, useCallback, useEffect, useRef, memo } from 'react'

import { StyleSheet, View } from 'react-native'

import { Button, CoreButtonProps, IconButton } from '@/components/core'
import { useTheme } from '@/hooks'
// components

import BaseBottomSheetBackdrop from './base-bottom-sheet-backdrop'

// component
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetHandle,
  BottomSheetHandleProps,
  BottomSheetProps,
} from '@gorhom/bottom-sheet'
import { createSpacing } from '@/helpers'

// styles
import { bottomSheetStyles as styles } from './base-bottom-sheet.styles'
import { IconButtonProps } from 'react-native-vector-icons/Icon'
import { themeConfig } from '@/config'
import { RNVectorIconProvider } from '@/interfaces'
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

interface Props {
  /**
   * open bottom sheet
   */
  open: boolean

  /**
   * function call when bottom sheet closed
   */
  onClose: () => void

  /**
   * snap index index when bottom sheet expanded.
   */
  onOpenSnapToIndex?: number

  /**
   * snap points
   */
  snapPoints: Array<string | number>

  /**
   * enable or disable handle indicator on top bottom sheet
   */
  enableHandle?: boolean

  /**
   * enable or disable close button.
   */
  enableCloseButton?: boolean

  /**
   * shape radius bottom sheet root component
   * int * shape radius
   */
  shapeRadius?: number

  /**
   * enable pan down to close
   */
  enablePanDownToClose?: boolean

  /**
   * is modal
   */
  isModal?: boolean

  /**
   * close button styles.
   */
  closeButtonStyle?: IconButtonProps['style']

  /**
   * actual content of bottom sheet
   */
  children: ReactNode

  /**
   * bottom sheet style
   */
  style?: BottomSheetProps['style']

  /**
   * bottom sheet container style
   */
  containerStyle?: BottomSheetProps['containerStyle']

  /**
   * bottom sheet background style
   */
  backgroundStyle?: BottomSheetProps['backgroundStyle']

  /**
   * enable or disable backdrop
   * Component to be placed as a sheet backdrop.
   * @see {BottomSheetBackdropProps}
   * @type React.FC\<BottomSheetBackdropProps\>
   * @default true
   */
  backdrop?: boolean

  backdropPressBehavior?: BackdropPressBehavior

  /**
   * footer button props...
   */
  enableFooterButton?: boolean
  enableFooterButtonTitle?: string
  onPressFooterButton?: () => void | undefined
  footerButtonPressBehavior?: 'close'
  footerButtonSize?: CoreButtonProps['size']
  footerButtonStartIcon?: CoreButtonProps['startIcon']
  footerButtonEndIcon?: CoreButtonProps['endIcon']
  footerButtonIconProvider?: RNVectorIconProvider
  footerButtonVariant?: CoreButtonProps['variant']
  footerButtonColor?: CoreButtonProps['color']
  footerButtonStyle?: CoreButtonProps['style']
}

const BaseBottomSheet: FC<Props> = props => {
  const {
    open,
    onClose,
    onOpenSnapToIndex,
    snapPoints,
    enableHandle,
    enableCloseButton,
    shapeRadius,
    enablePanDownToClose,
    isModal,
    closeButtonStyle,
    children,
    style,
    containerStyle,
    backgroundStyle,
    backdrop,
    backdropPressBehavior,
    enableFooterButton,
    enableFooterButtonTitle,
    onPressFooterButton,
    footerButtonPressBehavior,
    footerButtonSize,
    footerButtonStartIcon,
    footerButtonEndIcon,
    footerButtonIconProvider,
    footerButtonColor,
    footerButtonVariant,
    footerButtonStyle,
  } = props
  const theme = useTheme()

  const ref = useRef<BottomSheet>(null)

  const handleClose = (): void => {
    ref.current?.close()
  }

  useEffect(() => {
    if (ref.current && open) {
      const nextSnapIndex = snapPoints.length === 1 ? 0 : onOpenSnapToIndex
      ref.current?.snapToIndex(nextSnapIndex as number)
    }
  }, [ref.current, open])

  const onChange = useCallback(
    (index: number) => {
      if (index < 0 && typeof onClose === 'function') {
        onClose()
      }
    },
    [open, onClose]
  )

  const _onPressFooterButton = useCallback(() => {
    if (footerButtonPressBehavior === 'close') {
      ref?.current?.close()
    }
    typeof onPressFooterButton === 'function' && onPressFooterButton()
  }, [open, onPressFooterButton, footerButtonPressBehavior])

  // backdrop
  // prettier-ignore
  const renderBackdrop = useCallback((backdropProps: BottomSheetBackdropProps) => (
    <BaseBottomSheetBackdrop {...backdropProps} pressBehavior={backdropPressBehavior} />
  ), [])

  // bottom sheet handle
  const renderHandle = useCallback(
    (handleProps: BottomSheetHandleProps) => (
      <BottomSheetHandle {...handleProps} indicatorStyle={styles.bottomSheet_handleIndicatorStyle} />
    ),
    []
  )

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={backdrop ? renderBackdrop : null}
      snapPoints={snapPoints}
      enablePanDownToClose={enablePanDownToClose}
      style={StyleSheet.flatten([styles.bottomSheet_root, style])}
      containerStyle={containerStyle}
      backgroundStyle={StyleSheet.flatten([
        styles.bottomSheet_backgroundStyle,
        {
          backgroundColor: theme.palette.background.paper,
          borderRadius: Number(shapeRadius) * themeConfig.shape.borderRadius,
        },
        backgroundStyle,
      ])}
      onChange={onChange}
      handleComponent={enableHandle ? renderHandle : null}
    >
      {enableCloseButton && (
        <View
          style={{
            zIndex: 10,
            top: 0,
            right: createSpacing(3),
            position: 'absolute',
            alignSelf: 'flex-end',
          }}
        >
          <IconButton onPress={handleClose} icon='close' style={closeButtonStyle} />
        </View>
      )}
      <View style={styles.bottomSheet_content}>
        {children}
        {enableFooterButton && (
          <Button
            title={enableFooterButtonTitle as string}
            onPress={_onPressFooterButton}
            style={footerButtonStyle}
            size={footerButtonSize}
            startIcon={footerButtonStartIcon}
            endIcon={footerButtonEndIcon}
            iconType={footerButtonIconProvider}
            color={footerButtonColor}
            variant={footerButtonVariant}
          />
        )}
      </View>
    </BottomSheet>
  )
}

BaseBottomSheet.defaultProps = {
  enableCloseButton: false,
  shapeRadius: 3,
  enablePanDownToClose: true,
  enableHandle: true,
  backdrop: true,
  backdropPressBehavior: 'close',
  onOpenSnapToIndex: 0,
  enableFooterButton: false,
  enableFooterButtonTitle: '',
  onPressFooterButton: undefined,
  footerButtonSize: 'medium',
  footerButtonStartIcon: undefined,
  footerButtonEndIcon: undefined,
  footerButtonIconProvider: 'ionicons',
  footerButtonStyle: undefined,
  footerButtonColor: 'primary',
  footerButtonVariant: 'contained',
  footerButtonPressBehavior: 'close',
}

export default memo(BaseBottomSheet)
