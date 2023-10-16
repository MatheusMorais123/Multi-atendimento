import { getFirebaseBackend } from '@/helpers/firebase'
import { useUser } from '@/redux/user'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const fireStoreDb = getFirebaseBackend()

export const useRealTimeChatsCount = () => {
  const [chatData, setChatData] = useState({
    totalChats: 0,
    openChats: 0,
    inProgressChats: 0,
    totalChatsFinalized: 0,
    totalChatsByOperator: 0
  })

  const {
    userState: { authUser }
  } = useUser()

  useEffect(() => {
    if (authUser.id) {
      const { numbers, id } = authUser

      const chatsCollectionRef = collection(fireStoreDb, 'chats')
      const allChatsQuery = query(
        chatsCollectionRef,
        where('receiverNumber', 'in', numbers)
      )

      const finalizedChatsQuery = query(
        chatsCollectionRef,
        where('receiverNumber', 'in', numbers),
        where('status', '==', 'done')
      )
      const inProgressChatsQuery = query(
        chatsCollectionRef,
        where('receiverNumber', 'in', numbers),
        where('status', '==', 'in_progress')
      )
      const openChatsQuery = query(
        chatsCollectionRef,
        where('receiverNumber', 'in', numbers),
        where('status', '==', 'open')
      )

      const operatorChatsQuery = query(
        chatsCollectionRef,
        where('receiverNumber', 'in', numbers),
        where('operatorsId', 'array-contains', id)
      )

      const unsubscribeOperatorChats = onSnapshot(
        operatorChatsQuery,
        snapshot => {
          setChatData(prevData => ({
            ...prevData,
            totalChatsByOperator: snapshot.size
          }))
        }
      )

      const unsubscribeOpenChats = onSnapshot(openChatsQuery, snapshot => {
        setChatData(prevData => ({
          ...prevData,
          openChats: snapshot.size
        }))
      })

      const unsubscribeInProgressChats = onSnapshot(
        inProgressChatsQuery,
        snapshot => {
          setChatData(prevData => ({
            ...prevData,
            inProgressChats: snapshot.size
          }))
        }
      )

      const unsubscribeAllChats = onSnapshot(allChatsQuery, snapshot => {
        setChatData(prevData => ({
          ...prevData,
          totalChats: snapshot.size
        }))
      })

      const unsubscribeFinalizedChats = onSnapshot(
        finalizedChatsQuery,
        snapshot => {
          setChatData(prevData => ({
            ...prevData,
            totalChatsFinalized: snapshot.size
          }))
        }
      )

      return () => {
        unsubscribeAllChats()
        unsubscribeOpenChats()
        unsubscribeOperatorChats()
        unsubscribeInProgressChats()
        unsubscribeFinalizedChats()
      }
    }
  }, [authUser?.id])

  return chatData
}
