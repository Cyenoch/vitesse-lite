export const userToken = useLocalStorage<string | null>('token', null)

export function useUserInfo() {
  const { data: user } = useQuery(useUserInfoQueryOptions())
  return user
}
