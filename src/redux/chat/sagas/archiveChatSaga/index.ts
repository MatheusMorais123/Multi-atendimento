import { _fireStore } from '@/helpers/firebase'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { put } from 'redux-saga/effects'
import { archiveChatAsync } from '../../actions'

export function* archiveChatSaga(
  action: ReturnType<typeof archiveChatAsync.request>
) {
  const chat = action.payload

  try {
    const newStatus = toggleChatStatus(chat.status)

    const updatedChat = yield updateChatStatus(chat.id, newStatus)

    yield put(archiveChatAsync.success(updatedChat))
  } catch (error) {
    yield put(archiveChatAsync.failure(chat))
  }
}

function toggleChatStatus(currentStatus: string): string {
  return currentStatus === 'archived' ? 'in_progress' : 'archived'
}

function* updateChatStatus(chatId: string, newStatus: string) {
  const chatRef = doc(collection(_fireStore, 'chats'), chatId)
  const chatSnapshot = yield getDoc(chatRef)

  if (chatSnapshot.exists()) {
    const chatData = chatSnapshot.data()
    const updatedChat = { ...chatData, status: newStatus }

    yield updateDoc(chatRef, updatedChat)

    return updatedChat
  }

  throw new Error(`Chat with ID ${chatId} not found.`)
}
