import { Dispatch } from 'redux'
import { MessageState, MessageAction } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'

type UseMessages = {
  messageState: MessageState
  messagesDispatch: Dispatch<MessageAction>
}

export const useMessages = (): UseMessages => {
  const messageState = useSelector<ApplicationState, MessageState>(
    rootReducer => rootReducer.messageReducer
  )
  const messagesDispatch = useDispatch<Dispatch<MessageAction>>()
  return {
    messageState,
    messagesDispatch
  }
}
