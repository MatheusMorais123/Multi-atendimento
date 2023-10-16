import { _fireStore } from '@/helpers/firebase'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { put } from 'redux-saga/effects'
import { changeChatStatusAsync, clearActiveChat } from '../../actions'

export function* changeChatStatusSaga(
  action: ReturnType<typeof changeChatStatusAsync.request>
) {
  const { chatId, chatStatus, userId } = action.payload

  try {
    yield changeChatStatus(userId, chatStatus, chatId)

    yield put(changeChatStatusAsync.success())
    yield put(clearActiveChat())
  } catch (error) {
    console.error('Error when ending chat:', error)
    yield put(changeChatStatusAsync.failure(error))
  }
}

async function changeChatStatus(
  userId: string,
  chatStatus: any,
  chatId: string
) {
  const collectionName = `chats-to-devChat-messages-topic_${userId}`
  const chatDocRef = doc(collection(_fireStore, collectionName), chatId)

  await updateDoc(chatDocRef, { status: chatStatus })
}
