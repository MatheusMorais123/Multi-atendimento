import { combineReducers } from 'redux'
import { authReducer } from './auth/index'
import { layoutReducer } from './layout'
import { messageReducer } from './message/reducer'
import { userReducer } from './user/reducer'
import { contactsReducer } from './contacts/reducer'
import { chatReducer } from '@/redux/chat/reducer'

export default combineReducers({
  messageReducer,
  layoutReducer,
  authReducer,
  chatReducer,
  userReducer,
  contactsReducer
})
