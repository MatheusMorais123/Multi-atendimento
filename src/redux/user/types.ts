import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type UserAuthenticated = {
  email: string
  name: string
  numbers: number[]
  userId: string
  id: string
}

export type UserState = {
  authUser: UserAuthenticated
  isLoadingSaveAuthUser: boolean
  errorOnSaveAuthUser: boolean
}

export type UserActions = ActionType<typeof actions>
