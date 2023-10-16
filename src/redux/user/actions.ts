import { createAction } from 'typesafe-actions'
import { UserAuthenticated } from './types'

export const saveAuthUser = createAction(
  '@user/SAVE_AUTH_USER_SUCCESS'
)<UserAuthenticated>()
