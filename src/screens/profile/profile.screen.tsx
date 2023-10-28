// hooks
import { useAuth } from '@/hooks/auth'
import { useTheme } from '@/hooks'

// components
import { Screen } from '@/components/core'
import { UserProfileInfo, GuestProfileInfo } from '@/components/profile'
import { BottomSheetConfirmLogout } from '@/components/auth'

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
        {isAuthenticated ? <UserProfileInfo /> : <GuestProfileInfo />}
      </Screen>
      <BottomSheetConfirmLogout />
    </>
  )
}

export default ProfileScreen
