import { ActionType, createReducer } from 'typesafe-actions'
import { Message } from '../message/types'
import {
  addActiveChatMessage,
  addArchiveChat,
  addChat,
  answerChatAsync,
  archiveChatAsync,
  clearActiveChat,
  deleteChatAsync,
  deleteMessageFromChat,
  loadMessagesByChatIdAsync,
  readActiveChatMessagesAsync,
  removeArchiveChat,
  removeChat,
  setActiveChatMessage,
  setActiveChatMessages,
  setActiveChatSuccess,
  updateActiveChat,
  updateArchiveChat,
  updateChat
} from './actions'
import { Chat, ChatAction, ChatState } from './types'

const initialState: ChatState = {
  isLoading: false,
  isLoadingDeleteChat: false,
  isLoadingArchiveChat: false,
  isLoadingActiveChatMessagesSuccess: false,
  isLoadingReadActiveChatMessages: false,
  isErrorOnReadActiveChatMessages: false,
  isErrorOnDeleteChat: false,
  isErrorOnArchiveChat: false,
  error: null,
  chats: [],
  archiveChats: [],
  activeChat: null,
  infiniteScrollBottomHack: false
}

export const chatReducer = createReducer<ChatState, ChatAction>(initialState)
  .handleAction(
    addChat,
    (state: ChatState, action: ActionType<typeof addChat>): ChatState => {
      return {
        ...state,
        chats: addChatInChatsState(state.chats, action.payload)
      }
    }
  )
  .handleAction(
    updateChat,
    (state: ChatState, action: ActionType<typeof updateChat>): ChatState => ({
      ...state,
      chats: updateChatInChatsState(action.payload, state.chats)
    })
  )
  .handleAction(
    removeChat,
    (state: ChatState, action: ActionType<typeof removeChat>): ChatState => ({
      ...state,
      chats: state.chats.filter(chat => chat.id !== action.payload.id)
    })
  )
  .handleAction(
    addArchiveChat,
    (
      state: ChatState,
      action: ActionType<typeof addArchiveChat>
    ): ChatState => {
      return {
        ...state,
        archiveChats: addChatInChatsState(state.archiveChats, action.payload)
      }
    }
  )
  .handleAction(
    updateArchiveChat,
    (
      state: ChatState,
      action: ActionType<typeof updateArchiveChat>
    ): ChatState => ({
      ...state,
      archiveChats: updateChatInChatsState(action.payload, state.archiveChats)
    })
  )
  .handleAction(
    removeArchiveChat,
    (
      state: ChatState,
      action: ActionType<typeof removeArchiveChat>
    ): ChatState => ({
      ...state,
      archiveChats: state.archiveChats.filter(
        chat => chat.id !== action.payload.id
      )
    })
  )
  .handleAction(
    setActiveChatSuccess,
    (
      state: ChatState,
      action: ActionType<typeof setActiveChatSuccess>
    ): ChatState => ({
      ...state,
      activeChat: action.payload,
      infiniteScrollBottomHack: !state.infiniteScrollBottomHack
    })
  )
  .handleAction(
    setActiveChatMessage,
    (
      state: ChatState,
      action: ActionType<typeof setActiveChatMessage>
    ): ChatState => {
      const newActiveChat = {
        ...state.activeChat,
        messages: addUniqueMessages(state.activeChat.messages, [
          action.payload
        ]),
        lastMessage: action.payload
      }

      return {
        ...state,
        activeChat: newActiveChat,
        chats: updateChatInChatsState(newActiveChat, state.chats)
      }
    }
  )
  .handleAction(
    setActiveChatMessages,
    (
      state: ChatState,
      action: ActionType<typeof setActiveChatMessages>
    ): ChatState => {
      const newActiveChat = {
        ...state.activeChat,
        messages: [...state.activeChat.messages, ...action.payload]
      }

      return {
        ...state,
        activeChat: newActiveChat,
        chats: updateChatInChatsState(newActiveChat, state.chats)
      }
    }
  )
  .handleAction(
    loadMessagesByChatIdAsync.request,
    (state: ChatState): ChatState => ({
      ...state,
      isLoading: true,
      error: null
    })
  )
  .handleAction(
    loadMessagesByChatIdAsync.success,
    (
      state: ChatState,
      action: ActionType<typeof loadMessagesByChatIdAsync.success>
    ): ChatState => ({
      ...state,
      isLoading: false,
      isLoadingActiveChatMessagesSuccess: false,
      error: null,
      activeChat: {
        ...state.activeChat,
        messages: addUniqueMessages([], action.payload)
      }
    })
  )
  .handleAction(
    loadMessagesByChatIdAsync.failure,
    (
      state: ChatState,
      action: ActionType<typeof loadMessagesByChatIdAsync.failure>
    ): ChatState => ({
      ...state,
      isLoading: true,
      isLoadingActiveChatMessagesSuccess: false,
      error: action.payload
    })
  )
  .handleAction(
    addActiveChatMessage,
    (
      state: ChatState,
      action: ActionType<typeof addActiveChatMessage>
    ): ChatState => {
      const messageToAdd = action.payload

      const updatedMessages = state.activeChat?.messages?.length
        ? [...state.activeChat?.messages]
        : []

      const existsMessage = updatedMessages?.some(
        message => message.id === messageToAdd.id
      )

      if (!existsMessage) {
        updatedMessages.unshift(messageToAdd)
      }

      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: updatedMessages
        }
      }
    }
  )
  .handleAction(
    readActiveChatMessagesAsync.request,
    (state: ChatState): ChatState => ({
      ...state,
      isLoadingReadActiveChatMessages: true
    })
  )
  .handleAction(
    readActiveChatMessagesAsync.success,
    (
      state: ChatState,
      action: ActionType<typeof readActiveChatMessagesAsync.success>
    ): ChatState => ({
      ...state,
      isErrorOnReadActiveChatMessages: false,
      isLoadingReadActiveChatMessages: false,
      activeChat: action.payload,
      chats: updateChatInChatsState(action.payload, state.chats)
    })
  )
  .handleAction(
    readActiveChatMessagesAsync.failure,
    (
      state: ChatState,
      action: ActionType<typeof readActiveChatMessagesAsync.failure>
    ): ChatState => ({
      ...state,
      isLoadingReadActiveChatMessages: false,
      isErrorOnReadActiveChatMessages: true,
      chats: updateChatInChatsState(action.payload, state.chats)
    })
  )
  .handleAction(
    answerChatAsync.request,
    (state: ChatState): ChatState => ({
      ...state
    })
  )
  .handleAction(
    answerChatAsync.success,
    (
      state: ChatState,
      action: ActionType<typeof answerChatAsync.success>
    ): ChatState => ({
      ...state,
      activeChat: action.payload
    })
  )
  .handleAction(
    answerChatAsync.failure,
    (
      state: ChatState,
      action: ActionType<typeof answerChatAsync.failure>
    ): ChatState => ({
      ...state,
      // TODO: fill error
      activeChat: action.payload
    })
  )
  .handleAction(
    deleteChatAsync.request,
    (
      state: ChatState,
      action: ActionType<typeof deleteChatAsync.request>
    ): ChatState => ({
      ...state,
      isLoadingDeleteChat: true
    })
  )
  .handleAction(
    deleteChatAsync.success,
    (
      state: ChatState,
      action: ActionType<typeof deleteChatAsync.success>
    ): ChatState => ({
      ...state,
      isLoadingDeleteChat: false,
      chats: state.chats.filter(chat => chat.id !== action.payload.id),
      activeChat: {} as any
    })
  )
  .handleAction(
    deleteChatAsync.failure,
    (
      state: ChatState,
      action: ActionType<typeof deleteChatAsync.failure>
    ): ChatState => ({
      ...state,
      isLoadingDeleteChat: false,
      isErrorOnDeleteChat: true,
      chats: [...state.chats, action.payload]
    })
  )
  .handleAction(
    archiveChatAsync.request,
    (
      state: ChatState,
      action: ActionType<typeof archiveChatAsync.request>
    ): ChatState => ({
      ...state,
      isLoadingArchiveChat: true
    })
  )
  .handleAction(
    archiveChatAsync.success,
    (
      state: ChatState,
      action: ActionType<typeof archiveChatAsync.success>
    ): ChatState => ({
      ...state,
      isLoadingArchiveChat: false,
      chats: updateChatInChatsState(action.payload, state.chats)
    })
  )
  .handleAction(
    archiveChatAsync.failure,
    (
      state: ChatState,
      action: ActionType<typeof archiveChatAsync.failure>
    ): ChatState => ({
      ...state,
      isLoadingArchiveChat: false,
      isErrorOnArchiveChat: true,
      chats: updateChatInChatsState(action.payload, state.chats)
    })
  )
  .handleAction(
    updateActiveChat,
    (
      state: ChatState,
      action: ActionType<typeof updateActiveChat>
    ): ChatState => {
      delete action.payload.messages

      return {
        ...state,
        activeChat: { ...state.activeChat, ...action.payload },
        infiniteScrollBottomHack: !state.infiniteScrollBottomHack
      }
    }
  )
  .handleAction(
    deleteMessageFromChat,
    (
      state: ChatState,
      action: ActionType<typeof deleteMessageFromChat>
    ): ChatState => ({
      ...state,
      activeChat: {
        ...state.activeChat,
        messages: state.activeChat.messages?.filter(
          message => message.id !== action.payload.id
        )
      }
    })
  )
  .handleAction(
    clearActiveChat,
    (state: ChatState): ChatState => ({
      ...state,
      activeChat: null
    })
  )

function addUniqueMessages(
  existingMessages: Message[],
  newMessages: Message[]
) {
  if (!existingMessages?.length) {
    existingMessages = []
  }

  // const uniqueMessages = newMessages.filter(newMessage => {
  //   return !existingMessages.some(
  //     existingMessage => existingMessage.id === newMessage.id
  //   )
  // })

  const updatedMessages = [...existingMessages, ...newMessages]

  return updatedMessages
}

function updateChatInChatsState(currentChat: Chat, chats: Chat[]) {
  return chats.map(chat => (chat.id === currentChat.id ? currentChat : chat))
}

function addChatInChatsState(existingChats: Chat[], chatToAdd: Chat): Chat[] {
  const existingChatIndex = existingChats.findIndex(
    chat => chat.id === chatToAdd.id
  )

  if (existingChatIndex !== -1) {
    const updatedChats = [...existingChats]
    updatedChats[existingChatIndex] = chatToAdd
    return updatedChats
  }

  return [chatToAdd, ...existingChats]
}
