import { put } from 'redux-saga/effects'
import { deleteChatAsync } from '../../actions'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch
} from 'firebase/firestore'
import { _fireStore } from '@/helpers/firebase'
import { Chat } from '../../types'

export function* deleteChatByIdSaga(
  action: ReturnType<typeof deleteChatAsync.request>
) {
  const chat = action.payload

  try {
    yield put(deleteChatAsync.success(chat))

    yield deleteChatAndAssociatedMessages(chat.id)
  } catch (error) {
    yield handleDeleteError(error, chat)
  }
}

function* deleteChatAndAssociatedMessages(chatId: string) {
  yield deleteChatDocument(chatId)
  yield deleteAssociatedMessages(chatId)
}

function* deleteChatDocument(chatId: string) {
  const chatDocRef = doc(collection(_fireStore, 'chats'), chatId)
  yield deleteDoc(chatDocRef)
}

function* deleteAssociatedMessages(chatId: string) {
  const messagesQuery = createMessagesQuery(chatId)
  const messagesSnapshot = yield getDocs(messagesQuery)

  const batch = writeBatch(_fireStore)

  messagesSnapshot.docs.forEach(messageDoc => {
    batch.delete(messageDoc.ref)
  })

  yield batch.commit()
}

function createMessagesQuery(chatId: string) {
  return query(
    collection(_fireStore, 'messages'),
    where('chatId', '==', chatId)
  )
}

function* handleDeleteError(error: any, chat: Chat) {
  console.error('Error deleting chat:', error)
  yield put(deleteChatAsync.failure(chat))
}
