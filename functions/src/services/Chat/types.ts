import * as admin from "firebase-admin";
import {Message} from "../../types/message";

export type Chat = {
  id: string
  operatorsId?: number[]
  status: "open" | "in_progress" | "close"
  requesterId?: string
  requesterNumber: number
  receiverId?: string
  receiverNumber: number
  lastMessage?: Message
  messages?: Message[]
  unreadMessagesCount: number
  createdAt: admin.firestore.Timestamp
  updatedAt: admin.firestore.Timestamp
}
