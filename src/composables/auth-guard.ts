import { useQueryClient } from '@tanstack/vue-query'
import { fromAsyncThrowable } from 'neverthrow'
import { useUserInfoQueryOptions } from './api'

export function useAuthGuard() {
  const router = useRouter()

  router.beforeEach(async (to, _from) => {
    if (to.name === '/login' || to.path.startsWith('/auth/')) {
      return true
    }
    if (!userToken.value) {
      return '/login'
    }

    const queryClient = useQueryClient()
    const ensureData = fromAsyncThrowable(async () => {
      await queryClient.ensureQueryData(useUserInfoQueryOptions())
    })

    return await ensureData().match(() => {
      return true
    }, () => {
      userToken.value = null
      return '/login'
    })
  })
}
