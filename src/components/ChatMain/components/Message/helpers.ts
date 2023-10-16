import { Chat } from '@/redux/chat/types'
import { Message } from '@/redux/message/types'

export function getMessageType(message: Message) {
  if (!message?.file?.type) return 'unknown'

  const [type] = message.file.type.split('/')

  if (type === 'image') {
    return 'image'
  } else {
    return 'file'
  }
}

export function isSenderMessage(activeChat: Chat, message: Message): boolean {
  return activeChat.receiverNumber === message.senderNumber
}
