import BaseText from '@/components/BaseText'
import ChatAvatar from '@/components/ChatAvatar'
import React from 'react'
import starSecondary from '../../../../assets/images/icons/star-secondary.svg'
import star from '../../../../assets/images/icons/star.svg'
import * as S from './styles'
import { HeaderProps } from './types'
import { useChat } from '@/redux/chat'
import { formatPhoneNumber } from '@/helpers/number.helpers'
import { changeChatStatusAsync } from '@/redux/chat/actions'
import { useUser } from '@/redux/user'

export function Header({ onClickOnChatAvatar }: HeaderProps) {
  const {
    chatState: { activeChat },
    chatDispatch
  } = useChat()

  const {
    userState: { authUser }
  } = useUser()

  // FIXME: remove this
  const isFavorite = false

  return (
    <S.Wrapper>
      <S.ChatAvatarWrapper onClick={onClickOnChatAvatar}>
        <ChatAvatar
          text={`${activeChat?.requesterNumber}`}
          width="2rem"
          height="2rem"
        />
      </S.ChatAvatarWrapper>

      <S.HeaderMain>
        <BaseText
          fontWeight="semiBold"
          lineHeight={1}
          overflowEllipsis="true"
          maxWidth="152px"
        >
          {formatPhoneNumber(activeChat?.requesterNumber)}
        </BaseText>

        <BaseText maxWidth="152px" lineHeight={1}>
          {formatPhoneNumber(activeChat?.requesterNumber)}
        </BaseText>
      </S.HeaderMain>

      <S.HeaderEnd>
        <S.StarWrapper>
          {isFavorite ? (
            <img src={star} alt="Chat favorito" width="21px" height="21px" />
          ) : (
            <img
              src={starSecondary}
              alt="Chat não favorito"
              width="21px"
              height="21px"
            />
          )}
        </S.StarWrapper>

        <S.Timer>
          <BaseText fontSize="0.75rem" lineHeight={1.2}>
            00:33
          </BaseText>
        </S.Timer>

        <S.Button
          onClick={() =>
            chatDispatch(
              changeChatStatusAsync.request({
                userId: authUser.userId,
                chatId: activeChat.id,
                chatStatus:
                  activeChat.status !== 'close' ? 'close' : 'in_progress'
              })
            )
          }
        >
          <BaseText color="#fff" lineHeight={1.5} fontWeight="semiBold">
            {activeChat.status !== 'close' ? 'Finalizar' : 'Abrir Chat'}
          </BaseText>
        </S.Button>
      </S.HeaderEnd>
    </S.Wrapper>
  )
}
