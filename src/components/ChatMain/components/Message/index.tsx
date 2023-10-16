import React from 'react'
import * as S from './styles'
import BaseText from '@/components/BaseText'
import { MessageProps } from './types'
import { formatDateToChat } from '@/helpers/date.helpers'
import { useChat } from '@/redux/chat'

import { ImageList } from './components/ImageList'
import { FileList } from './components/FileList'
import { getMessageType, isSenderMessage } from './helpers'

export function Message({ message }: MessageProps) {
  const {
    chatState: { activeChat }
  } = useChat()

  return (
    <S.Wrapper
      issender={isSenderMessage(activeChat, message) ? 'true' : 'false'}
    >
      <BaseText lineHeight={1.192} color="#000000" breakWord="true">
        {message.messageText}
      </BaseText>

      {getMessageType(message) === 'image' && (
        <ImageList images={[message.file]} />
      )}

      {getMessageType(message) === 'file' && <FileList file={message.file} />}

      <BaseText lineHeight={1.026} color="#ADB5BD">
        {formatDateToChat(message.createdAt)}
      </BaseText>
    </S.Wrapper>
  )
}
