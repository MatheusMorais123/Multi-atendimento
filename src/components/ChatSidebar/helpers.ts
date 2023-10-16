import { Chat } from '@/redux/chat/types'

export function getFilteredChats(chatsToFilter: Chat[], search: string) {
  if (!search) return chatsToFilter

  const result = chatsToFilter.filter(
    chat =>
      chat.lastMessage?.messageText.toLowerCase().includes(search) ||
      chat.requesterNumber.toString().includes(search)
  )

  return result
}

export function separateChatsByStatusCloseOrArchived(chats: Chat[]) {
  const closeOrArchivedChats: Chat[] = []
  const otherChats: Chat[] = []

  for (const chat of chats) {
    if (chat.status === 'close' || chat.status === 'archived') {
      closeOrArchivedChats.push(chat)
    } else {
      otherChats.push(chat)
    }
  }

  return {
    closeOrArchivedChats,
    otherChats
  }
}
