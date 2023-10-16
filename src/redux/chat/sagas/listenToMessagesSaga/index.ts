import { ActionType } from 'typesafe-actions'
import {
  addActiveChatMessage,
  listenToMessagesByChatIdSuccess
} from '../../actions'
import { call, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { _fireStore } from '@/helpers/firebase'
import { Message } from '@/redux/message/types'
import { CreateMessagesChannel } from './types'

export function* listenToMessagesSaga(
  action: ActionType<typeof listenToMessagesByChatIdSuccess>
) {
  const { chatId, userId } = action.payload
  const channel = yield call(createMessagesChannel, { chatId, userId })
  while (true) {
    const action: ActionType<typeof listenToMessagesByChatIdSuccess> =
      yield take(channel)
    yield put(action)
  }
}

export function createMessagesChannel({
  chatId,
  userId
}: CreateMessagesChannel) {
  return eventChannel(emitter => {
    const collectionName = `devChat-messages-topic_${userId}`
    const messagesQuery = query(
      collection(_fireStore, collectionName),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'desc'),
      limit(1)
    )

    const unsubscribe = onSnapshot(messagesQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        const message = change.doc.data()
        if (change.type === 'added') {
          emitter(addActiveChatMessage(message as Message))
        }
      })
    })

    return unsubscribe
  })
}
