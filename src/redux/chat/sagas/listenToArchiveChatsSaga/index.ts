import { ActionType } from 'typesafe-actions'
import {
  addArchiveChat,
  listenToArchiveChatsSuccess,
  removeArchiveChat,
  updateArchiveChat
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

export function* listenToArchiveChatsSaga(
  action: ActionType<typeof listenToArchiveChatsSuccess>
) {
  const { receiverNumbers } = action.payload
  const channel = yield call(createArchiveChatsChannel, { receiverNumbers })
  while (true) {
    const action: ActionType<typeof listenToArchiveChatsSuccess> = yield take(
      channel
    )
    yield put(action)
  }
}

type CreateArchiveChatsChannel = {
  receiverNumbers: number[]
}
export function createArchiveChatsChannel({
  receiverNumbers
}: CreateArchiveChatsChannel) {
  return eventChannel(emitter => {
    const chatsQuery = query(
      collection(_fireStore, 'chats'),
      where('receiverNumber', 'in', receiverNumbers),
      where('status', 'in', ['archived']),
      orderBy('updatedAt', 'asc')
    )

    const unsubscribe = onSnapshot(chatsQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        const chat = change.doc.data()
        if (change.type === 'added') {
          emitter(addArchiveChat(chat as Chat))
        } else if (change.type === 'modified') {
          emitter(updateArchiveChat(chat as Chat))
        } else if (change.type === 'removed') {
          emitter(removeArchiveChat(chat as Chat))
        }
      })
    })

    return unsubscribe
  })
}
