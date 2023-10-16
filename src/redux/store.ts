import { createStore, applyMiddleware, compose, type Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './rootSaga'

import { LayoutState } from './layout/types'
import logger from 'redux-logger'
import { AuthState } from './auth/types'
import { MessageState } from './message/types'
import { ChatState } from '@/redux/chat/types'
import { UserState } from './user/types'
import { ContactsState } from './contacts/types'
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger]

export type ApplicationState = {
  authReducer: AuthState
  chatReducer: ChatState
  layoutReducer: LayoutState
  messageReducer: MessageState
  userReducer: UserState
  contactsReducer: ContactsState
}

export function configureStore() {
  const composeEnhancers = compose

  const store: Store<ApplicationState> = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  sagaMiddleware.run(rootSaga)
  return store
}
