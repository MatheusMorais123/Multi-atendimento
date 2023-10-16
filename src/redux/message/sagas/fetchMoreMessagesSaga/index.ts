import { put } from 'redux-saga/effects'
import { fetchMoreMessagesAsync, setHasMoreMessages } from '../../actions'
import { setActiveChatMessages } from '@/redux/chat/actions'
import { Message } from '../../types'
import {
  DocumentData,
  Query,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore'
import { _fireStore } from '@/helpers/firebase'

export function* fetchMoreMessagesSaga(
  action: ReturnType<typeof fetchMoreMessagesAsync.request>
) {
  yield put(setHasMoreMessages({ state: false }))
  try {
    const { lastMessage, chatId, userId } = action.payload
    console.log('LAST MESSAGE', lastMessage)

    const { moreMessages, count } = yield fetchMoreMessages(
      lastMessage,
      chatId,
      userId
    )
    console.log('MORE MESSAGES', moreMessages)
    console.log('COUNT', count)

    if (!(count < 8)) {
      yield put(setHasMoreMessages({ state: true }))
    }

    yield put(
      setActiveChatMessages(
        hasLastMessageIntoCurrentMessages(lastMessage, moreMessages)
          ? []
          : moreMessages
      )
    )
  } catch (error) {
    yield put(fetchMoreMessagesAsync.failure(error))
  }
}

function hasLastMessageIntoCurrentMessages(
  lastMessage: Message,
  messages: Message[]
) {
  return messages.some(message => message.id === lastMessage.id)
}

async function fetchMoreMessages(
  lastMessage: Message,
  chatId: string,
  userId: string
) {
  try {
    const collectionName = `devChat-messages-topic_${userId}`
    const q = query(
      collection(_fireStore, collectionName),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'desc'),
      startAfter(lastMessage.createdAt),
      limit(7)
    )

    const queryToCount = query(
      collection(_fireStore, collectionName),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'desc'),
      startAfter(lastMessage.createdAt),
      limit(8)
    )

    const count = await countDocumentsInQuery(queryToCount)

    const snapshot = await getDocs(q)
    const moreMessages = snapshot.docs.map(doc => doc.data())
    return { moreMessages, count }
  } catch (error) {
    throw new Error(`Error fetching more messages: ${error}`)
  }
}

async function countDocumentsInQuery(query: Query<DocumentData>) {
  try {
    const snapshot = await getDocs(query)
    return snapshot.size
  } catch (error) {
    console.error('Error on count docs:', error)
    throw error
  }
}
