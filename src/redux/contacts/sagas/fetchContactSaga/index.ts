import { put, call } from 'redux-saga/effects'
import { fetchContactsByChatIdAsync } from '../../actions'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/helpers/firebase'
// import { Contact } from '../../types'

export function* fetchContactsByChatIdSaga(
  action: ReturnType<typeof fetchContactsByChatIdAsync.request>
) {
  const { chatId } = action.payload

  try {
    // Verifique se o valor "authUser" está presente no localStorage
    const authUserString = localStorage.getItem('authUser')
    if (!authUserString) {
      throw new Error('O valor "authUser" não está presente no localStorage.')
    }
    console.log('Busca')

    const authUser = JSON.parse(authUserString)
    const userId = authUser.userId

    const collectionName = `devChat-contacts-client_${userId}`
    const contactsCollection = collection(db, collectionName)
    const contactsQuery = query(
      contactsCollection,
      where('chatId', '==', chatId),
      orderBy('createdAt', 'desc')
    )
    const contactsQuerySnapshot = yield call(getDocs, contactsQuery)
    const contactsData = contactsQuerySnapshot.docs.map(doc => doc.data())
    console.log(contactsData)
    yield put(fetchContactsByChatIdAsync.success(contactsData))
  } catch (error) {
    console.log(error)
    yield put(fetchContactsByChatIdAsync.failure(error))
  }
}
