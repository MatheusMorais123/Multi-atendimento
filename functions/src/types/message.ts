import * as admin from "firebase-admin";

export type Message = {
  id: string
  chatId?: string
  operatorId?: string
  senderId?: string
  senderNumber: number
  receiverId?: string
  receiverNumber: number
  messageText: string
  isRead: boolean
  isSend: boolean
  createdAt: admin.firestore.FieldValue
}
