import { Input } from '@/components/Input'
import { Chat } from '@/redux/chat/types'
import React, { useEffect, useState } from 'react'
import search from '../../../../assets/images/icons/search.svg'
import { getFilteredChats } from '../../helpers'
import { ChatsAccordion } from './components/ChatsAccordion'
import * as S from './styles'
import { OpenChatsPanelProps } from './types'

export function OpenChatsPanel({ chats }: OpenChatsPanelProps) {
  const [chatsMain, setChatsMain] = useState<Chat[]>()

  function handleSearch(
    e: React.ChangeEvent<HTMLInputElement>,
    chatsToFilter: Chat[]
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

      <ChatsAccordion chats={chatsMain} />
    </S.Wrapper>
  )
}
