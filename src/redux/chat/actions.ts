import { createAsyncAction, createAction } from 'typesafe-actions'
import { Chat } from './types'
import { Message } from '../message/types'

export const deleteChatAsync = createAsyncAction(
  '@chat/DELETE_CHAT_REQUEST',
  '@chat/DELETE_CHAT_SUCCESS',
  '@chat/DELETE_CHAT_FAILURE'
)<Chat, Chat, Chat>()

export const archiveChatAsync = createAsyncAction(
  '@chat/ARCHIVE_CHAT_REQUEST',
  '@chat/ARCHIVE_CHAT_SUCCESS',
  '@chat/ARCHIVE_CHAT_FAILURE'
)<Chat, Chat, Chat>()

export const loadMessagesByChatIdAsync = createAsyncAction(
  '@chat/LOAD_MESSAGES_BY_CHAT_ID_REQUEST',
  '@chat/LOAD_MESSAGES_BY_CHAT_ID_SUCCESS',
  '@chat/LOAD_MESSAGES_BY_CHAT_ID_FAILURE'
)<{ chatId: string; userId: string }, Message[], Error>()

export const readActiveChatMessagesAsync = createAsyncAction(
  '@chat/READ_ACTIVE_CHAT_MESSAGES_REQUEST',
  '@chat/READ_ACTIVE_CHAT_MESSAGES_SUCCESS',
  '@chat/READ_ACTIVE_CHAT_MESSAGES_FAILURE'
)<{ chat: Chat; userId: string }, Chat, Chat>()

export const answerChatAsync = createAsyncAction(
  '@chat/ANSWER_CHAT_REQUEST',
  '@chat/ANSWER_CHAT_SUCCESS',
  '@chat/ANSWER_CHAT_FAILURE'
)<Chat, Chat, Chat>()

export const changeChatStatusAsync = createAsyncAction(
  '@chat/CHANGE_CHAT_STATUS_REQUEST',
  '@chat/CHANGE_CHAT_STATUS_SUCCESS',
  '@chat/CHANGE_CHAT_STATUS_FAILURE'
)<
  {
    chatId: string
    chatStatus: 'open' | 'in_progress' | 'close'
    userId: string
  },
  void,
  Error
>()

export const addChat = createAction('@chat/ADD_CHAT')<Chat>()
export const updateChat = createAction('@chat/UPDATE_CHAT')<Chat>()
export const removeChat = createAction('@chat/REMOVE_CHAT')<Chat>()
export const addArchiveChat = createAction('@chat/ADD_ARCHIVE_CHAT')<Chat>()
export const clearActiveChat = createAction('@chat/CLEAR_ACTIVE_CHAT')<void>()

export const updateArchiveChat = createAction(
  '@chat/UPDATE_ARCHIVE_CHAT'
)<Chat>()

export const removeArchiveChat = createAction(
  '@chat/REMOVE_ARCHIVE_CHAT'
)<Chat>()

export const addActiveChatMessage = createAction(
  '@chat/ADD_ACTIVE_CHAT_MESSAGE'
)<Message>()

export const listenToChatsSuccess = createAction(
  '@chat/LISTEN_TO_CHATS_SUCCESS'
)<{
  receiverNumbers: number[]
  userId: string
}>()

export const listenToArchiveChatsSuccess = createAction(
  '@chat/LISTEN_TO_ARCHIVE_CHATS_SUCCESS'
)<{
  receiverNumbers: number[]
}>()

export const listenToMessagesByChatIdSuccess = createAction(
  '@chat/LISTEN_TO_MESSAGES_BY_CHAT_ID_SUCCESS'
)<{
  chatId: string
  userId: string
}>()

export const setActiveChatSuccess = createAction(
  '@chat/SET_ACTIVE_CHAT_SUCCESS'
)<Chat>()

export const setActiveChatMessage = createAction(
  '@chat/SET_ACTIVE_CHAT_MESSAGE'
)<Message>()

export const setActiveChatMessages = createAction(
  '@chat/SET_ACTIVE_CHAT_MESSAGES'
)<Message[]>()

export const updateActiveChat = createAction('@chat/UPDATE_ACTIVE_CHAT')<Chat>()

export const deleteMessageFromChat = createAction(
  '@chat/DELETE_MESSAGE_FROM_CHAT'
)<Message>()
