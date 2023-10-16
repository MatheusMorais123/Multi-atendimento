import { call, put } from 'redux-saga/effects'
import { collection, getDocs, addDoc, where, query } from 'firebase/firestore'
import { db } from '@/helpers/firebase'
import { createContactAsync } from '../../actions'
// import { Contact } from '../../types'

/* const updateCollectionData = (data: Contact[]) => ({
  type: 'UPDATE_COLLECTION_DATA',
  payload: data
}) */

/* export function* createContactSaga(
  action: ReturnType<typeof createContactAsync.request>
) {
  try {
    const newContact = action.payload
    console.log(newContact)

    const authUserString = localStorage.getItem('authUser')

    if (!authUserString) {
      // Trate o caso em que 'authUser' não está presente no localStorage
      console.error('O valor "authUser" não está presente no localStorage.')
      return
    }

    try {
      const authUser = JSON.parse(authUserString)
      const userId = authUser.user_id

      const colecaoName = `devChat-contacts-client_${userId}`
      const colecaoRef = collection(db, colecaoName)

      const colecaoSnapshot = yield call(getDocs, colecaoRef)

      if (colecaoSnapshot.empty) {
        yield call(addDoc, collection(db, colecaoName), newContact)

        console.log('Novo contato criado:', newContact)

        yield put(createContactAsync.success(newContact))

        console.log('Contato enviado para Firestore com sucesso:', newContact)
      }
    } catch (error) {
      console.error('Erro ao analisar "authUser" do localStorage:', error)
    }
  } catch (error) {
    console.error('Erro ao criar contato:', error)

    // Disparar a ação de falha, se necessário.
    yield put(createContactAsync.failure(error))
  }
}
 */
export function* createContactSaga(
  action: ReturnType<typeof createContactAsync.request>
) {
  try {
    const newContact = action.payload
    console.log(newContact)

    const authUserString = localStorage.getItem('authUser')

    if (!authUserString) {
      // Trate o caso em que 'authUser' não está presente no localStorage
      console.error('O valor "authUser" não está presente no localStorage.')
      return
    }

    try {
      const authUser = JSON.parse(authUserString)
      const userId = authUser.userId

      const colecaoName = `devChat-contacts-client_${userId}`
      const colecaoRef = collection(db, colecaoName)

      // Verifique se já existe um documento com o mesmo 'user_id'
      const existingContactQuery = query(
        colecaoRef,
        where('user_id', '==', userId)
      )
      const existingContactSnapshot = yield call(getDocs, existingContactQuery)

      if (existingContactSnapshot.empty) {
        // Se não houver nenhum documento com o mesmo 'user_id', crie um novo
        yield call(addDoc, colecaoRef, newContact)

        console.log('Novo contato criado:', newContact)

        yield put(createContactAsync.success(newContact))

        console.log('Contato enviado para Firestore com sucesso:', newContact)
      } else {
        // Se já existir um documento com o mesmo 'user_id', adicione mais informações a ele
        const existingContactDoc = existingContactSnapshot.docs[0]
        const existingContactData = existingContactDoc.data()

        console.log(
          'Contato existente atualizado com novas informações:',
          existingContactData
        )
      }
    } catch (error) {
      console.error('Erro ao analisar "authUser" do localStorage:', error)
    }
  } catch (error) {
    console.error('Erro ao criar contato:', error)

    // Disparar a ação de falha, se necessário.
    yield put(createContactAsync.failure(error))
  }
}
