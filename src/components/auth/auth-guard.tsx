import { useAuth } from '@/hooks/auth'

const AuthGuard = () => {
  const { isAuthenticated } = useAuth()
  return <></>
}

export default AuthGuard
