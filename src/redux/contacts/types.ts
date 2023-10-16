import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { FirebaseDate } from '@/models/firebase.models'

export type Contact = {
  id: string
  name: string
  email: string
  createdAt: FirebaseDate
}

export type ContactsState = {
  contacts: Contact[]
  isLoading: boolean
  error: Error | null
  hasMoreMessages: boolean
}

export type ContactsAction = ActionType<typeof actions>
