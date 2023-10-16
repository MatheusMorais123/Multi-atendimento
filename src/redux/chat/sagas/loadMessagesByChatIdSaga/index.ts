import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  DocumentData,
  Query
} from 'firebase/firestore'
import { loadMessagesByChatIdAsync } from '../../actions'
import { Message } from '@/redux/message/types'
import { call, put } from 'redux-saga/effects'
import { setHasMoreMessages } from '@/redux/message/actions'
import { _fireStore } from '@/helpers/firebase'

const MESSAGES_LIMIT = 7
const COUNT_QUERY_LIMIT = 8

export function* loadMessagesByChatIdSaga(
  action: ReturnType<typeof loadMessagesByChatIdAsync.request>
) {
  const { chatId, userId } = action.payload

  try {
    const messages = yield call(fetchMessages, chatId, userId)

    const hasMoreMessages = yield checkMoreMessagesAvailability(chatId, userId)

    yield put(setHasMoreMessages({ state: hasMoreMessages }))
    yield put(loadMessagesByChatIdAsync.success(messages))
  } catch (error) {
    yield put(loadMessagesByChatIdAsync.failure(error))
  }
}

function* fetchMessages(chatId: string, userId: string) {
  const messagesQuery = createMessagesQuery(chatId, userId, MESSAGES_LIMIT)

  const messagesQuerySnapshot = yield call(getDocs, messagesQuery)

  const messagesData: Message[] = messagesQuerySnapshot.docs.map(
    doc => doc.data() as Message
  )

  return messagesData
}

function* checkMoreMessagesAvailability(chatId: string, userId: string) {
  const countQuery = createMessagesQuery(chatId, userId, COUNT_QUERY_LIMIT)

  const count = yield countDocumentsInQuery(countQuery)

  return count >= COUNT_QUERY_LIMIT
}

function createMessagesQuery(
  chatId: string,
  userId: string,
  queryLimit: number
) {
  const collectionName = `devChat-messages-topic_${userId}`
  return query(
    collection(_fireStore, collectionName),
    where('chatId', '==', chatId),
    orderBy('createdAt', 'desc'),
    limit(queryLimit)
  )
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
