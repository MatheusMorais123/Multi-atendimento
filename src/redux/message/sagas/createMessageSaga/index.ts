import {
  Timestamp,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { CreateMessageRequestParam, createMessageAsync } from '../../actions'
import { Message } from '../../types'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { _fireBaseStorage, _fireStore } from '@/helpers/firebase'
import { put } from 'redux-saga/effects'
import { Chat } from '@/redux/chat/types'
import { generateTicketNumber } from '../../utils'
import { updateActiveChat } from '@/redux/chat/actions'

export function* createMessageSaga(
  action: ReturnType<typeof createMessageAsync.request>
) {
  try {
    const { message, userId } = action.payload

    const newMessage = yield createNewMessage({ message })

    yield uploadMessageToFirestore(newMessage, userId)
    yield updateChatWithNewMessage(newMessage, userId)

    yield put(createMessageAsync.success())
  } catch (error) {
    console.log({ createMessageERROR: error })
    yield put(createMessageAsync.failure(error))
  }
}

async function createNewMessage({
  message
}: Partial<CreateMessageRequestParam>): Promise<Message> {
  console.log({ message })
  let file: Message['file'] = {} as Message['file']
  if (message.file) {
    const fileUrl = await uploadFileToStorage(message.file)

    file = {
      name: message.file.name,
      type: message.file.type,
      size: message.file.size,
      url: fileUrl
    }
  }

  return {
    ...message,
    id: '',
    isRead: false,
    isSend: true,
    file,
    createdAt: Timestamp.now()
  }
}

async function uploadFileToStorage(file: File) {
  const storageRef = ref(_fireBaseStorage, file.name)

  try {
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log({ downloadURL })
    return downloadURL
  } catch (error) {
    throw new Error(error)
  }
}

function* uploadMessageToFirestore(message: Message, userId: string) {
  const collectionName = `devChat-messages-topic_${userId}`
  const newMessageDoc = doc(collection(_fireStore, collectionName))
  message.id = newMessageDoc.id

  yield setDoc(newMessageDoc, message)
}

function* updateChatWithNewMessage(newMessage: Message, userId: string) {
  const collectionName = `chats-to-devChat-messages-topic_${userId}`
  const chatDoc = doc(collection(_fireStore, collectionName), newMessage.chatId)
  const chatSnapshot = yield getDoc(chatDoc)

  if (chatSnapshot.exists()) {
    const chatData: Chat = chatSnapshot.data()
    const ticketNumber = generateTicketNumber()

    const updatedChatData: Chat = {
      ...chatData,
      lastMessage: newMessage,
      status: chatData.status === 'open' ? 'in_progress' : chatData.status,
      ticket: chatData.ticket ? chatData.ticket : ticketNumber,
      operatorsId: updateOperatorsId(
        chatData.operatorsId,
        newMessage?.operator?.id
      )
    }

    yield updateDoc(chatDoc, updatedChatData)
    yield put(updateActiveChat(updatedChatData))
  }
}

function updateOperatorsId(
  operatorsId: string[] = [],
  newOperatorId: string
): string[] {
  if (!newOperatorId) return operatorsId

  return operatorsId?.includes(newOperatorId)
    ? operatorsId
    : [newOperatorId, ...operatorsId]
}
