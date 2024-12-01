import { useQueryClient } from '@tanstack/vue-query'
import { fromAsyncThrowable } from 'neverthrow'
import { useUserInfoQueryOptions } from './api'

export function useAuthGuard() {
  const router = useRouter()

  router.beforeEach(async (to, _from) => {
    // login page and auth page not intercept
    if (to.name === '/login' || to.path.startsWith('/auth/')) {
      return true
    }

    // no login redirect to login page
    if (!userToken.value) {
      return '/login'
    }

    // ensure user info loaded
    const queryClient = useQueryClient()
    const ensureData = fromAsyncThrowable(async () => {
      await queryClient.ensureQueryData(useUserInfoQueryOptions())
    })

    return await ensureData().match(() => {
      return true
    }, () => {
      // login expired clear login status
      userToken.value = null
      return '/login'
    })
  })
}
