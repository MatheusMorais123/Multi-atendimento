import React, { useEffect } from 'react'

import { useChat } from '@/redux/chat'
import {
  listenToMessagesByChatIdSuccess,
  loadMessagesByChatIdAsync,
  readActiveChatMessagesAsync
} from '@/redux/chat/actions'
import { closeChannel } from '@/redux/chat/helpers/channel.helpers'
import { createMessagesChannel } from '@/redux/chat/sagas/listenToMessagesSaga'
import { ChatInput } from './components/ChatInput'
import { Header } from './components/Header'
import { Messages } from './components/Messages'
import * as S from './styles'
import { ChatMainProps } from './types'
import logodark from '@/assets/images/logo-dark.svg'
import { useUser } from '@/redux/user'

export function ChatMain({ onClickOnChatAvatar }: ChatMainProps) {
  const {
    chatState: { activeChat },
    chatDispatch
  } = useChat()

  const {
    userState: { authUser }
  } = useUser()

  useEffect(() => {
    if (activeChat?.id) {
      chatDispatch(
        loadMessagesByChatIdAsync.request({
          chatId: activeChat.id,
          userId: authUser.userId
        })
      )
      chatDispatch(
        readActiveChatMessagesAsync.request({
          chat: activeChat,
          userId: authUser.userId
        })
      )
    }
  }, [activeChat?.id])

  useEffect(() => {
    if (activeChat?.id) {
      const channel = createMessagesChannel({
        chatId: activeChat.id,
        userId: authUser.userId
      })

      chatDispatch(
        listenToMessagesByChatIdSuccess({
          chatId: activeChat.id,
          userId: authUser.userId
        })
      )

      return () => {
        closeChannel(channel)
      }
    }
  }, [activeChat?.id])

  return (
    <S.Wrapper>
      {!activeChat?.id ? (
        <S.LogoContainer>
          <img src={logodark} />
        </S.LogoContainer>
      ) : (
        <>
          <Header onClickOnChatAvatar={onClickOnChatAvatar} />

          <S.Content>
            <Messages
              chatId={activeChat?.id}
              messages={activeChat?.messages || []}
            />
          </S.Content>

          <S.End>
            <ChatInput />
          </S.End>
        </>
      )}
    </S.Wrapper>
  )
}
