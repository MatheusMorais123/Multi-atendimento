import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type AuthState = {
  user: () => any
  loading: boolean
  isUserLogout: boolean
  error: Error | null
  passwordResetStatus: any
}

export type AuthActions = ActionType<typeof actions>
