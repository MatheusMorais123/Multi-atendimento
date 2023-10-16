import { createArchiveChatsChannel } from '../sagas/listenToArchiveChatsSaga'
import { createChatsChannel } from '../sagas/listenToChatsSaga'

export function closeChannel(
  channel:
    | ReturnType<typeof createChatsChannel>
    | ReturnType<typeof createArchiveChatsChannel>
) {
  if (channel) {
    channel.close()
  }
}
