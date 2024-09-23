import { queryOptions } from '@tanstack/vue-query'

export function useUserInfoQueryOptions() {
  return queryOptions({
    queryKey: ['user', 'info'],
    queryFn: async () => {
      return {
        username: 'test',
      }
    },
  })
}
