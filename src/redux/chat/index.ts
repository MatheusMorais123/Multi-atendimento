import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { ChatAction, ChatState } from './types'
import { Dispatch } from 'redux'

type UseChats = {
  chatState: ChatState
  chatDispatch?: Dispatch<ChatAction>
}

export const useChat = (): UseChats => {
  const chatState = useSelector<ApplicationState, ChatState>(
    rootReducer => rootReducer.chatReducer
  )
  const chatDispatch = useDispatch<Dispatch<ChatAction>>()
  return { chatState, chatDispatch }
}
