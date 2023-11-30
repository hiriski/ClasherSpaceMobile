import { StyleSheet, View } from 'react-native'
import { Button } from '@/components/core'
import { useFeedback } from '@/hooks'
import { platformUtils } from '@/utilities'

const FloatingFeedbackButton = () => {
  const { feedback_setOpenBottomSheet } = useFeedback()
  return (
    <View style={styles.root}>
      <Button
        size='medium'
        color='success'
        title='FEEDBACK'
        variant='contained'
        iconType='material-community-icons'
        startIcon='message-badge-outline'
        onPress={() => feedback_setOpenBottomSheet(true)}
        style={styles.overrideBtn}
        textStyle={{ letterSpacing: 1.2, color: '#ffffff' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: platformUtils.isIOS ? 120 : 100,
    right: 0,
  },
  overrideBtn: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: 'rgba(0,0,0,0.65)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
})

export default FloatingFeedbackButton
