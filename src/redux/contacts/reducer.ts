import { ActionType, createReducer } from 'typesafe-actions'
import { createContactAsync, fetchContactsByChatIdAsync } from './actions'
import { ContactsAction, ContactsState } from './types'

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  error: null,
  hasMoreMessages: false
}

export const contactsReducer = createReducer<ContactsState, ContactsAction>(
  initialState
)
  .handleAction(
    createContactAsync.request,
    (state: ContactsState): ContactsState => ({
      ...state,
      isLoading: true,
      error: null
    })
  )
  .handleAction(
    createContactAsync.success,
    (
      state: ContactsState,
      action: ActionType<typeof createContactAsync.success>
    ): ContactsState => ({
      ...state,
      isLoading: false,
      error: null,
      contacts: [...state.contacts, action.payload]
    })
  )
  .handleAction(
    createContactAsync.failure,
    (
      state: ContactsState,
      action: ActionType<typeof createContactAsync.failure>
    ): ContactsState => ({
      ...state,
      isLoading: false,
      error: action.payload
    })
  )

  .handleAction(
    fetchContactsByChatIdAsync.request,
    (state: ContactsState): ContactsState => ({
      ...state,
      isLoading: true,
      error: null
    })
  )

  .handleAction(
    fetchContactsByChatIdAsync.success,
    (
      state: ContactsState,
      action: ActionType<typeof fetchContactsByChatIdAsync.success>
    ): ContactsState => ({
      ...state,
      isLoading: true,
      contacts: [...state.contacts, ...action.payload.contacts]
    })
  )
  .handleAction(
    fetchContactsByChatIdAsync.failure,
    (
      state: ContactsState,
      action: ActionType<typeof fetchContactsByChatIdAsync.failure>
    ): ContactsState => ({
      ...state,
      isLoading: false,
      error: action.payload.error
    })
  )
