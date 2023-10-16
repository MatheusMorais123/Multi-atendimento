import { FirebaseDate } from '@/models/firebase.models'
import { Message } from '@/redux/message/types'
import * as actions from './actions'
import { ActionType } from 'typesafe-actions'

export type Chat = {
  id: string
  operatorsId?: string[]
  status: 'open' | 'in_progress' | 'close' | 'archived'
  requesterId?: string
  requesterNumber: number
  receiverId?: string
  receiverNumber: number
  lastMessage?: Message
  ticket?: string
  messages?: Message[]
  unreadMessagesCount: number
  createdAt: FirebaseDate
  updatedAt: FirebaseDate
}

export type ChatState = {
  isLoading: boolean
  error: Error | null
  chats: Chat[]
  archiveChats: Chat[]
  activeChat: Chat
  isLoadingActiveChatMessagesSuccess: boolean
  isLoadingDeleteChat: boolean
  isLoadingArchiveChat: boolean
  isLoadingReadActiveChatMessages: boolean
  isErrorOnReadActiveChatMessages: boolean
  isErrorOnDeleteChat: boolean
  isErrorOnArchiveChat: boolean
  infiniteScrollBottomHack: boolean
}

export type ChatAction = ActionType<typeof actions>
