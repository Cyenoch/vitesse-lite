export interface ApiResult<D = unknown> {
  data: D
  code: 0 | 1

  msg: 'success' | (string & {})
}

export interface ApiListResult<I>extends ApiResult<{
  list: I[]
  total: number
}> {

}
