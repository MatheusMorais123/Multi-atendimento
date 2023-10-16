import React from 'react'
import { Details } from './components/Details'
import { Header } from './components/Header'
import { Notes } from './components/Notes'
import * as S from './styles'
import { ChatUserDetailProps } from './types'
import { Tags } from './components/Tags'

export function ChatUserDetail({
  open,
  onCloseChatUserDetail
}: ChatUserDetailProps) {
  return (
    <S.Wrapper open={open}>
      <S.Container>
        <Header onClose={onCloseChatUserDetail} />

        <Details />

        <Tags />

        <Notes />
      </S.Container>
    </S.Wrapper>
  )
}
