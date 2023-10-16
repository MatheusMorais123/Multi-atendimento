import {
  DocumentReference,
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore'
import { readActiveChatMessagesAsync } from '../../actions'
import { Chat } from '../../types'
import { call, put } from 'redux-saga/effects'
import { _fireStore } from '@/helpers/firebase'

export function* readActiveChatMessagesSaga(
  action: ReturnType<typeof readActiveChatMessagesAsync.request>
) {
  const { chat, userId } = action.payload

  try {
    const updatedAt = Timestamp.now()

    const updatedChat = yield updateChatUnreadCountAndTimestamp(
      chat,
      userId,
      updatedAt
    )

    yield markUnreadMessagesAsReadIfNeeded(updatedChat, userId)
  } catch (error) {
    yield handleReadError(error, action.payload.chat)
  }
}

function* updateChatUnreadCountAndTimestamp(
  chat: Chat,
  userId: string,
  updatedAt: Timestamp
) {
  const chatRef = getChatDocumentRef(chat.id, userId)

  const updatedChat = {
    ...chat,
    unreadMessagesCount: 0,
    updatedAt
  }

  yield updateChatDocument(chatRef, updatedChat)

  return updatedChat
}

function* markUnreadMessagesAsReadIfNeeded(chat: Chat, userId: string) {
  if (chat.unreadMessagesCount > 0) {
    const chatRef = getChatDocumentRef(chat.id, userId)

    yield runTransactionAndUpdateUnreadMessagesCount(chatRef, chat.id)
    yield call(markMessagesAsRead, chat.id)
  }
}

function* runTransactionAndUpdateUnreadMessagesCount(
  chatRef: DocumentReference,
  chatId: string
) {
  yield runTransaction(_fireStore, async transaction => {
    const chatSnapshot = await transaction.get(chatRef)

    if (chatSnapshot.exists()) {
      transaction.update(chatRef, {
        unreadMessagesCount: 0,
        updatedAt: Timestamp.now()
      })
    }
  })
}

function* handleReadError(error: any, chat: Chat) {
  console.error('Error reading active chat messages:', error)
  yield put(readActiveChatMessagesAsync.failure(chat))
}

function getChatDocumentRef(chatId: string, userId: string): DocumentReference {
  const collectionName = `chats-to-devChat-messages-topic_${userId}`
  return doc(collection(_fireStore, collectionName), chatId)
}

function* updateChatDocument(chatRef: DocumentReference, updatedChat: Chat) {
  yield updateDoc(chatRef, updatedChat)
}

async function markMessagesAsRead(chatId: string) {
  try {
    const messagesCollection = collection(_fireStore, 'messages')
    const messagesQuery = query(
      messagesCollection,
      where('chatId', '==', chatId),
      orderBy('createdAt', 'desc')
    )

    const messagesQuerySnapShot = await getDocs(messagesQuery)
    if (!messagesQuerySnapShot.empty) {
      const batch = writeBatch(_fireStore)
      messagesQuerySnapShot.docs.map(async doc => {
        batch.update(doc.ref, { isRead: true })
      })
      await batch.commit()
    }
  } catch (error) {
    throw new Error(error)
  }
}
