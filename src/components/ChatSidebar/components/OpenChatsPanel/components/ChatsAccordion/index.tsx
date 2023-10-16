import BaseText from '@/components/BaseText'
import React, { useEffect, useState } from 'react'
import 'react-accessible-accordion/dist/fancy-example.css'
import { Chat } from '../../../Chat'
import * as S from './style'
import { ChatsAccordionProps } from './types'
import { Chat as ChatType } from '@/redux/chat/types'
import { separateChatsByStatus } from './helpers'

export function ChatsAccordion({ chats }: ChatsAccordionProps) {
  const [openChats, setOpenChats] = useState<ChatType[]>()
  const [inProgressChats, setInProgressChats] = useState<ChatType[]>()

  useEffect(() => {
    if (chats?.length) {
      const { openChats, inProgressChats } = separateChatsByStatus(chats)

      setOpenChats(openChats)
      setInProgressChats(inProgressChats)
    }
  }, [chats])

  return (
    <S.Wrapper>
      <S.Accordion allowZeroExpanded preExpanded={['a']}>
        <S.AccordionItem uuid="a">
          <S.AccordionItemHeading>
            <S.AccordionItemButton>
              <BaseText fontWeight="semiBold" lineHeight={1.75}>
                Aguardando atendimento (
                {openChats?.length ? openChats.length : 0})
              </BaseText>
            </S.AccordionItemButton>
          </S.AccordionItemHeading>

          <S.AccordionItemPanel>
            {openChats?.map(chat => (
              <Chat key={chat.id} isFavorite={false} chat={chat} />
            ))}
          </S.AccordionItemPanel>
        </S.AccordionItem>

        <S.AccordionItem uuid="b">
          <S.AccordionItemHeading>
            <S.AccordionItemButton>
              <BaseText fontWeight="semiBold" lineHeight={1.75}>
                Em atendimento (
                {inProgressChats?.length ? inProgressChats.length : 0})
              </BaseText>
            </S.AccordionItemButton>
          </S.AccordionItemHeading>

          <S.AccordionItemPanel>
            {inProgressChats?.map(chat => (
              <Chat key={chat.id} isFavorite={false} chat={chat} />
            ))}
          </S.AccordionItemPanel>
        </S.AccordionItem>
      </S.Accordion>
    </S.Wrapper>
  )
}
