import { ChatMain } from '@/components/ChatMain'
import { ChatUserDetail } from '@/components/ChatUserDetail'
import { ThemeContainerInner } from '@/components/ThemeContainer'
import useToggleModal from '@/hooks/useToggleModal'
import React from 'react'
import * as S from './styles'
import { DefaultHeader } from '@/components/DefaultHeader'
import { ChatSidebar } from '@/components/ChatSidebar'
import { Connect } from '@/components/Connect'
export default function ChatPage() {
  const { isOpen, toggleModal } = useToggleModal()

  return (
    <S.Container>
      <DefaultHeader />
      <Connect />

      <ThemeContainerInner>
        <S.Wrapper>
          <ChatSidebar />

          <ChatMain onClickOnChatAvatar={() => toggleModal({})} />

          <ChatUserDetail
            open={isOpen}
            onCloseChatUserDetail={() => toggleModal({})}
          />
        </S.Wrapper>
      </ThemeContainerInner>
    </S.Container>
  )
}
