import BaseText from '@/components/BaseText'
import ChatAvatar from '@/components/ChatAvatar'
import React from 'react'
import * as S from './styles'
import { ChatProps } from './types'
import star from '../../../../assets/images/icons/star.svg'
import { formatPhoneNumber } from '@/helpers/number.helpers'
import { formatDateToChat } from '@/helpers/date.helpers'
import { useChat } from '@/redux/chat'
import { Chat as ChatParam } from '@/redux/chat/types'
import { setActiveChatSuccess } from '@/redux/chat/actions'

export function Chat({ isFavorite, chat }: ChatProps) {
  const {
    chatState: { activeChat },
    chatDispatch
  } = useChat()

  function handleClickOnChat(chat: ChatParam) {
    if (activeChat?.id !== chat.id) {
      chatDispatch(setActiveChatSuccess(chat))
    }
  }

  return (
    <S.Wrapper
      isactive={chat.id === activeChat?.id ? 'true' : 'false'}
      onClick={() => handleClickOnChat(chat)}
    >
      <S.Container>
        <ChatAvatar
          text={`${chat.requesterNumber}`}
          width="2rem"
          height="2rem"
        />

        <S.Main>
          <div>
            <BaseText maxWidth="152px" lineHeight={1} fontWeight="semiBold">
              {formatPhoneNumber(chat.requesterNumber)}
            </BaseText>

            {isFavorite && (
              <img src={star} alt="Chat favorito" width="16px" height="16px" />
            )}
          </div>

          <BaseText maxWidth="152px" lineHeight={1}>
            {formatPhoneNumber(chat.requesterNumber)}
          </BaseText>

          <BaseText
            maxWidth="152px"
            fontWeight="semiBold"
            overflowEllipsis="true"
            lineHeight={1}
          >
            {chat.lastMessage?.messageText}
          </BaseText>
        </S.Main>

        <S.End>
          <S.Date>
            {chat.lastMessage
              ? formatDateToChat(chat.lastMessage.createdAt)
              : null}
          </S.Date>

          {chat.unreadMessagesCount > 0 && (
            <S.MessagesCount>
              <BaseText color="#fff" lineHeight={1} fontWeight="bold">
                {chat.unreadMessagesCount}
              </BaseText>
            </S.MessagesCount>
          )}
        </S.End>
      </S.Container>
    </S.Wrapper>
  )
}
