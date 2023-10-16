import { Dispatch } from 'redux'
import { UserActions, UserState } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'

type UseUser = {
  userState: UserState
  userDispatch: Dispatch<UserActions>
}

export const useUser = (): UseUser => {
  const userState = useSelector<ApplicationState, UserState>(
    rootReducer => rootReducer.userReducer
  )

  const userDispatch = useDispatch<Dispatch<UserActions>>()

  return {
    userState,
    userDispatch
  }
}
