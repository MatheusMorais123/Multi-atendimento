import { createAction, createAsyncAction } from 'typesafe-actions'

// TODO: type all this props after

export const login = createAsyncAction(
  '@login/LOGIN_REQUEST',
  '@login/LOGIN_SUCCESS',
  '@login/LOGIN_FAILURE'
)<
  { userName: string; password: string; history: any },
  { user: any },
  { error: Error }
>()

export const logout = createAsyncAction(
  '@logout/LOGOUT_REQUEST',
  '@logout/LOGOUT_SUCCESS',
  '@logout/LOGOUT_FAILURE'
)<{ history: any }, null, { error: Error }>()

export const register = createAsyncAction(
  '@register/REGISTER_REQUEST',
  '@register/REGISTER_SUCCESS',
  '@register/REGISTER_FAILURE'
)<{ user: any }, { user: any }, { error: Error }>()

export const forgetPassword = createAsyncAction(
  '@forgetPassword/FORGET_PASSWORD_REQUEST',
  '@forgetPassword/FORGET_PASSWORD_SUCCESS',
  '@forgetPassword/FORGET_PASSWORD_FAILURE'
)<{ email: string }, { passwordResetStatus: any }, { error: Error }>()

export const apiError = createAction('@apiError/API_ERROR')<{ error: any }>()
