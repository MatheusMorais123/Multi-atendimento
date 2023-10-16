import { getLoggedInUser } from '@/helpers/authUtils'
import { ActionType, createReducer } from 'typesafe-actions'
import { apiError, forgetPassword, login, logout, register } from './actions'
import { AuthActions, AuthState } from './types'

const initialState: AuthState = {
  user: getLoggedInUser(),
  loading: false,
  isUserLogout: false,
  error: null,
  passwordResetStatus: null
}

export const authReducer = createReducer<AuthState, AuthActions>(initialState)
  .handleAction(
    login.request,
    (
      state: AuthState,
      action: ActionType<typeof login.request>
    ): AuthState => ({
      ...state,
      loading: true
    })
  )
  .handleAction(
    login.success,
    (
      state: AuthState,
      action: ActionType<typeof login.success>
    ): AuthState => ({
      ...state,
      loading: false,
      error: null,
      user: action.payload.user
    })
  )
  .handleAction(
    login.failure,
    (
      state: AuthState,
      action: ActionType<typeof login.failure>
    ): AuthState => ({
      ...state,
      loading: false,
      error: action.payload.error,
      user: null
    })
  )
  .handleAction(
    register.request,
    (
      state: AuthState,
      action: ActionType<typeof register.request>
    ): AuthState => ({
      ...state,
      loading: true
    })
  )
  .handleAction(
    register.success,
    (
      state: AuthState,
      action: ActionType<typeof register.success>
    ): AuthState => ({
      ...state,
      loading: false,
      error: null,
      user: action.payload.user
    })
  )
  .handleAction(
    logout.success,
    (
      state: AuthState,
      action: ActionType<typeof logout.success>
    ): AuthState => ({
      ...state,
      user: null,
      isUserLogout: true
    })
  )
  .handleAction(
    forgetPassword.request,
    (
      state: AuthState,
      action: ActionType<typeof forgetPassword.request>
    ): AuthState => ({
      ...state,
      loading: true
    })
  )
  .handleAction(
    forgetPassword.success,
    (
      state: AuthState,
      action: ActionType<typeof forgetPassword.success>
    ): AuthState => ({
      ...state,
      loading: false,
      error: null,
      passwordResetStatus: action.payload.passwordResetStatus
    })
  )
  .handleAction(
    apiError,
    (state: AuthState, action: ActionType<typeof apiError>): AuthState => ({
      ...state,
      loading: false,
      error: action.payload.error,
      isUserLogout: false
    })
  )
