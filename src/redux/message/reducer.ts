import { ActionType, createReducer } from 'typesafe-actions'
import { createMessageAsync, setHasMoreMessages } from './actions'
import { MessageAction, MessageState } from './types'

const initialState: MessageState = {
  messages: [],
  isLoading: false,
  error: null,
  hasMoreMessages: false
}

export const messageReducer = createReducer<MessageState, MessageAction>(
  initialState
)
  .handleAction(
    createMessageAsync.request,
    (state: MessageState): MessageState => ({
      ...state,
      isLoading: true,
      error: null
    })
  )
  .handleAction(
    createMessageAsync.success,
    (state: MessageState): MessageState => ({
      ...state,
      isLoading: false,
      error: null
    })
  )
  .handleAction(
    createMessageAsync.failure,
    (
      state: MessageState,
      action: ActionType<typeof createMessageAsync.failure>
    ): MessageState => ({
      ...state,
      isLoading: false,
      error: action.payload
    })
  )
  .handleAction(
    setHasMoreMessages,
    (
      state: MessageState,
      action: ActionType<typeof setHasMoreMessages>
    ): MessageState => ({
      ...state,
      isLoading: false,
      error: null,
      hasMoreMessages: action.payload.state
    })
  )
