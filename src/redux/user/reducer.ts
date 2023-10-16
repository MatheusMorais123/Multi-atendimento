import { ActionType, createReducer } from 'typesafe-actions'
import { saveAuthUser } from './actions'
import { UserActions, UserState } from './types'

const initialState: UserState = {
  authUser: null,
  errorOnSaveAuthUser: null,
  isLoadingSaveAuthUser: false
}

export const userReducer = createReducer<UserState, UserActions>(
  initialState
).handleAction(
  saveAuthUser,
  (state: UserState, action: ActionType<typeof saveAuthUser>): UserState => ({
    ...state,
    isLoadingSaveAuthUser: false,
    authUser: action.payload
  })
)
