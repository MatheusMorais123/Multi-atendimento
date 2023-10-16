import { Message } from '@/redux/message/types'

export type MessagesProps = {
  messages: Message[]
  chatId: string
}
