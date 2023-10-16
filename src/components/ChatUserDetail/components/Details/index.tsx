import React, { useState } from 'react'
import BaseText from '@/components/BaseText'
import ChatAvatar from '@/components/ChatAvatar'
import callIcon from '../../../../assets/images/icons/call.svg'
import emailIcon from '../../../../assets/images/icons/email.svg'
import { useChat } from '@/redux/chat'
import { formatPhoneNumber } from '@/helpers/number.helpers'
import { Input } from '@/components/Input'
import { createContactAsync } from '../../../../redux/contacts/actions'
import { useContacts } from '@/redux/contacts'
import { useDispatch } from 'react-redux'
import * as S from './styles'

export function Details() {
  const {
    chatState: { activeChat }
  } = useChat()
  console.log('Tess', activeChat)

  const {
    contactsState: { contacts }
  } = useContacts()
  console.log(contacts)

  const chatId = activeChat ? activeChat.id : null

  console.log('chat', chatId)

  const dispatch = useDispatch()

  const [modoEdicaoNome, setModoEdicaoNome] = useState(false)
  const [nome, setNome] = useState('')

  const [modoEdicaoEmail, setModoEdicaoEmail] = useState(false)
  const [email, setEmail] = useState('Cadastrar e-mail')

  const handleChangeNome = event => {
    setNome(event.target.value)
  }

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const alternarModoEdicaoNome = () => {
    setModoEdicaoNome(!modoEdicaoNome)
  }

  const alternarModoEdicaoEmail = () => {
    setModoEdicaoEmail(!modoEdicaoEmail)
  }

  const salvarDados = chatId => {
    const createdAt = new Date()

    const timestampInSeconds = Math.floor(createdAt.getTime() / 1000)

    const firebaseDate = {
      seconds: timestampInSeconds,
      nanoseconds: 0
    }

    const authUserString = localStorage.getItem('authUser')

    if (!authUserString) {
      console.error('O valor "authUser" não está presente no localStorage.')
      return
    }

    try {
      // const authUser = JSON.parse(authUserString)
      // const operatorId = authUser.user_id

      const contactData = {
        id: '1',
        name: nome,
        email,
        chatId,
        // operatorId,
        createdAt: firebaseDate
      }

      if (chatId !== null) {
        dispatch(createContactAsync.request(contactData))
      }
      setModoEdicaoNome(false)
      setModoEdicaoEmail(false)
    } catch (error) {
      console.error('Erro ao analisar "authUser" do localStorage:', error)
    }
  }

  return (
    <S.Wrapper>
      <S.DetailsHeader>
        <S.DetailsHeaderContainer>
          <ChatAvatar width="2rem" height="2rem" />

          <S.DetailsHeaderMain>
            <S.Edit>
              {modoEdicaoNome ? (
                <Input
                  type="text"
                  value={nome}
                  onChange={handleChangeNome}
                  onBlur={() => salvarDados(chatId)}
                  autoFocus
                  height="37px"
                />
              ) : (
                <BaseText
                  fontWeight="semiBold"
                  lineHeight={2}
                  maxWidth="152px"
                  fontSize="14px"
                  onClick={alternarModoEdicaoNome}
                >
                  Sem nome
                </BaseText>
              )}
            </S.Edit>
          </S.DetailsHeaderMain>
        </S.DetailsHeaderContainer>

        <S.BaseTextWrapper>
          <img src={callIcon} width="24px" height="24px" />
          <BaseText>{formatPhoneNumber(activeChat?.requesterNumber)}</BaseText>
        </S.BaseTextWrapper>

        <S.BaseTextWrapper>
          {modoEdicaoEmail ? (
            <Input
              type="text"
              value={email}
              onChange={handleChangeEmail}
              onBlur={() => salvarDados(chatId)}
              autoFocus
              leftIcon={<img src={emailIcon} alt="Email Icon" />}
              onClick={alternarModoEdicaoEmail}
            />
          ) : (
            <>
              <img src={emailIcon} width="24px" height="24px" />
              <BaseText onClick={alternarModoEdicaoEmail}>{email}</BaseText>
            </>
          )}
        </S.BaseTextWrapper>
      </S.DetailsHeader>
    </S.Wrapper>
  )
}
