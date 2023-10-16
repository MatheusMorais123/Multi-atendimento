import { all, takeLatest } from 'redux-saga/effects'

import {
  archiveChatAsync,
  deleteChatAsync,
  changeChatStatusAsync,
  listenToArchiveChatsSuccess,
  listenToChatsSuccess,
  listenToMessagesByChatIdSuccess,
  loadMessagesByChatIdAsync,
  readActiveChatMessagesAsync
} from './chat/actions'
import {
  archiveChatSaga,
  deleteChatByIdSaga,
  listenToArchiveChatsSaga,
  listenToChatsSaga,
  listenToMessagesSaga,
  loadMessagesByChatIdSaga,
  readActiveChatMessagesSaga
} from './chat/sagas'
import {
  createMessageAsync,
  deleteMessageAsync,
  fetchMoreMessagesAsync
} from './message/actions'
import {
  createMessageSaga,
  deleteMessageSaga,
  fetchMoreMessagesSaga
} from './message/sagas'
import { changeChatStatusSaga } from './chat/sagas/changeChatStatusSaga'

import {
  createContactAsync,
  fetchContactsByChatIdAsync
} from './contacts/actions'

import { createContactSaga } from './contacts/sagas/createContactSaga'

import { fetchContactsByChatIdSaga } from './contacts/sagas/fetchContactSaga'

export default function* rootSaga() {
  return yield all([
    takeLatest(changeChatStatusAsync.request, changeChatStatusSaga),
    takeLatest(deleteChatAsync.request, deleteChatByIdSaga),
    takeLatest(archiveChatAsync.request, archiveChatSaga),
    takeLatest(loadMessagesByChatIdAsync.request, loadMessagesByChatIdSaga),
    takeLatest(fetchMoreMessagesAsync.request, fetchMoreMessagesSaga),
    takeLatest(readActiveChatMessagesAsync.request, readActiveChatMessagesSaga),
    takeLatest(createMessageAsync.request, createMessageSaga),
    takeLatest(createContactAsync.request, createContactSaga),
    takeLatest(fetchContactsByChatIdAsync.request, fetchContactsByChatIdSaga),
    takeLatest(deleteMessageAsync.request, deleteMessageSaga),
    takeLatest(listenToChatsSuccess, listenToChatsSaga),
    takeLatest(listenToArchiveChatsSuccess, listenToArchiveChatsSaga),
    takeLatest(listenToMessagesByChatIdSuccess, listenToMessagesSaga)
  ])
}
