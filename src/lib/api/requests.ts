import { client } from './client'

// TODO:
export function login(body: { username: string, password: string }) {
  return client('', {
    method: 'POST',
    body,
  })
}
