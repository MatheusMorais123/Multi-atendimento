import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { ContactsAction, ContactsState } from './types'
import { Dispatch } from 'redux'

type UseContacts = {
  contactsState: ContactsState
  contactsDispatch?: Dispatch<ContactsAction>
}

export const useContacts = (): UseContacts => {
  const contactsState = useSelector<ApplicationState, ContactsState>(
    rootReducer => rootReducer.contactsReducer
  )
  const contactsDispatch = useDispatch<Dispatch<ContactsAction>>()
  return { contactsState, contactsDispatch }
}
