import { FirebaseDate } from '@/models/firebase.models'
import * as actions from './actions'
import { ActionType } from 'typesafe-actions'

type Operator = {
  id: string
  name: string
}

export type Message = {
  id: string
  chatId?: string
  senderId?: string
  operator?: Operator
  senderNumber: number
  receiverId?: string
  receiverNumber: number
  messageText: string
  isRead: boolean
  isSend: boolean
  file?: File
  createdAt: FirebaseDate
}

type File = {
  type: string
  name: string
  size: number
  url: any
}

export type MessageState = {
  messages: Message[]
  isLoading: boolean
  error: Error | null
  hasMoreMessages: boolean
}

export type MessageAction = ActionType<typeof actions>
