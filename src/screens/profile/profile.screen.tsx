// hooks
import { useAuth } from '@/hooks/auth'
import { useTheme } from '@/hooks'

// components
import { Screen } from '@/components/core'
import { GuestProfileInfo } from '@/components/profile'
import { BottomSheetConfirmLogout } from '@/components/auth'
import { platformUtils } from '@/utilities'
import UserProfileInfoIOS from '@/components/profile/user-profile-info.ios'
import UserProfileInfoAndroid from '@/components/profile/user-profile-info.android'

const ProfileScreen = (): JSX.Element => {
  const theme = useTheme()
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Screen
        preset='fixed'
        statusBarStyle='dark-content'
        title='Profile'
        titleSize='small'
        backgroundColor={theme.palette.background.default}
        headerBackgroundColor={theme.palette.background.default}
        style={{ paddingHorizontal: theme.horizontalSpacing }}
      >
        {isAuthenticated ? platformUtils.isIOS ? <UserProfileInfoIOS /> : <UserProfileInfoAndroid /> : <GuestProfileInfo />}
      </Screen>
      <BottomSheetConfirmLogout />
    </>
  )
}

export default ProfileScreen
