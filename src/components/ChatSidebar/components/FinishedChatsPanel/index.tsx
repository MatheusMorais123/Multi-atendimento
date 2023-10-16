import { Input } from '@/components/Input'
import React, { useEffect, useState } from 'react'
import search from '../../../../assets/images/icons/search.svg'
// import { Chat } from '../Chat'
import { Chat as ChatType } from '@/redux/chat/types'
import { getFilteredChats } from '../../helpers'
import * as S from './styles'
import { FinishedChatsPanelProps } from './types'
import { Chat } from '../Chat'

export function FinishedChatsPanel({ chats }: FinishedChatsPanelProps) {
  const [chatsMain, setChatsMain] = useState<ChatType[]>()

  console.log('finished', chats)

  function handleSearch(
    e: React.ChangeEvent<HTMLInputElement>,
    chatsToFilter: ChatType[]
  ) {
    const search = e.target.value

    const result = getFilteredChats(chatsToFilter, search)
    setChatsMain(result)
  }

  useEffect(() => {
    setChatsMain(chats)
  }, [chats])

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <Input
          onChange={e => handleSearch(e, chats)}
          placeholder="Buscar conversa"
          height="2.438rem"
          borderColor="#ADB5BD"
          leftIcon={
            <img
              src={search}
              alt="Buscar conversa"
              width="24px"
              height="24px"
            />
          }
        />
      </S.InputWrapper>

      <S.ChatList>
        {chatsMain?.map(chat => (
          <Chat key={chat.id} isFavorite={false} chat={chat} />
        ))}
      </S.ChatList>
    </S.Wrapper>
  )
}
