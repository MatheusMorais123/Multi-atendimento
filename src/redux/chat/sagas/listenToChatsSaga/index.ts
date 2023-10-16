import { ActionType } from 'typesafe-actions'
import {
  addChat,
  listenToChatsSuccess,
  removeChat,
  updateChat
} from '../../actions'
import { call, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { Chat } from '../../types'
import { _fireStore } from '@/helpers/firebase'

export function* listenToChatsSaga(
  action: ActionType<typeof listenToChatsSuccess>
) {
  const { receiverNumbers, userId } = action.payload
  const channel = yield call(createChatsChannel, { receiverNumbers, userId })
  while (true) {
    const action: ActionType<typeof listenToChatsSuccess> = yield take(channel)
    yield put(action)
  }
}

type CreateChatsChannel = {
  receiverNumbers: number[]
  userId: string
}

export function createChatsChannel({
  receiverNumbers,
  userId
}: CreateChatsChannel) {
  return eventChannel(emitter => {
    const collectionName = `chats-to-devChat-messages-topic_${userId}`
    const stringNumbers = receiverNumbers.map(number => number.toString())

    const chatsQuery = query(
      collection(_fireStore, collectionName),
      where('receiverNumber', 'in', stringNumbers),
      where('status', 'in', ['open', 'in_progress', 'close']),
      orderBy('updatedAt', 'asc')
    )

    const unsubscribe = onSnapshot(chatsQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        const chat = change.doc.data()
        if (change.type === 'added') {
          emitter(addChat(chat as Chat))
        } else if (change.type === 'modified') {
          emitter(updateChat(chat as Chat))
        } else if (change.type === 'removed') {
          emitter(removeChat(chat as Chat))
        }
      })
    })

    return unsubscribe
  })
}
