import { Chat } from '@/redux/chat/types'

export function separateChatsByStatus(chats: Chat[]) {
  const openChats: Chat[] = []
  const inProgressChats: Chat[] = []

  for (const chat of chats) {
    if (chat.status === 'open') {
      openChats.push(chat)
    } else if (chat.status === 'in_progress') {
      inProgressChats.push(chat)
    }
  }

  return {
    openChats,
    inProgressChats
  }
}
