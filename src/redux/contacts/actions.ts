import { createAsyncAction, createAction } from 'typesafe-actions'
import { Contact } from './types'

export const createContactAsync = createAsyncAction(
  '@contact/CREATE_CONTACT_REQUEST',
  '@contact/CREATE_CONTACT_SUCCESS',
  '@contact/CREATE_CONTACT_FAILURE'
)<Contact, Contact, Error>()

export const fetchContactsByChatIdAsync = createAsyncAction(
  '@contact/FETCH_CONTACTS_BY_CHAT_ID_REQUEST',
  '@contact/FETCH_CONTACTS_BY_CHAT_ID_SUCCESS',
  '@contact/FETCH_CONTACTS_BY_CHAT_ID_FAILURE'
)<{ userId: string }, { contacts: Contact[] }, { error: Error }>()

export const listenToContactsSucess = createAction(
  '@contact/LISTEN_TO_CONTACTS_SUCCESS'
)<{
  chatId: string
}>()
