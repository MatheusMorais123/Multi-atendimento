import { put } from 'redux-saga/effects'
import { deleteMessageAsync } from '../../actions'
import { deleteDoc, doc } from 'firebase/firestore'
import { Message } from '../../types'
import { _fireStore } from '@/helpers/firebase'
import {
  deleteMessageFromChat,
  setActiveChatMessage
} from '@/redux/chat/actions'

export function* deleteMessageSaga(
  action: ReturnType<typeof deleteMessageAsync.request>
) {
  const { message: messageToDelete, userId } = action.payload

  try {
    yield put(deleteMessageFromChat(messageToDelete))
    yield deleteMessageFromFirestore(messageToDelete, userId)
  } catch (error) {
    yield handleDeleteMessageError(messageToDelete, error)
  }
}

export function* deleteMessageFromFirestore(message: Message, userId: string) {
  const collectionName = `devChat-messages-topic_${userId}`
  const messageRef = doc(_fireStore, collectionName, message.id)
  yield deleteDoc(messageRef)
}

export function* handleDeleteMessageError(message: Message, error: Error) {
  yield put(setActiveChatMessage(message))
  yield put(deleteMessageAsync.failure(error))
}
