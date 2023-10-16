import { createAsyncAction, createAction } from 'typesafe-actions'
import { Message } from './types'

export type CreateMessageRequestParam = {
  userId: string
  message: { file?: File } & Pick<
    Message,
    | 'senderId'
    | 'senderNumber'
    | 'receiverNumber'
    | 'chatId'
    | 'messageText'
    | 'operator'
  >
}
export const createMessageAsync = createAsyncAction(
  '@message/CREATE_MESSAGE_REQUEST',
  '@message/CREATE_MESSAGE_SUCCESS',
  '@message/CREATE_MESSAGE_FAILURE'
)<CreateMessageRequestParam, void, Error>()

export const deleteMessageAsync = createAsyncAction(
  '@message/DELETE_MESSAGE_REQUEST',
  '@message/DELETE_MESSAGE_SUCCESS',
  '@message/DELETE_MESSAGE_FAILURE'
)<{ message: Message; userId: string }, void, Error>()

export const fetchMoreMessagesAsync = createAsyncAction(
  '@message/FETCH_MORE_MESSAGES_REQUEST',
  '',
  '@message/FETCH_MORE_MESSAGES_FAILURE'
)<{ chatId: string; lastMessage: Message; userId: string }, null, Error>()

export const setHasMoreMessages = createAction(
  '@message/SET_HAS_MORE-MESSAGES'
)<{ state: boolean }>()
