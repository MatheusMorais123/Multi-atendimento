import { useChat } from '@/redux/chat'
import { listenToChatsSuccess } from '@/redux/chat/actions'
import { fetchContactsByChatIdAsync } from '@/redux/contacts/actions'
import { closeChannel } from '@/redux/chat/helpers/channel.helpers'
import { createChatsChannel } from '@/redux/chat/sagas/listenToChatsSaga'
import { Chat as ChatType } from '@/redux/chat/types'
import { useUser } from '@/redux/user'
import { theme } from '@/styles/theme'
import React, { useEffect, useState } from 'react'
import Heading from '../Heading'
import MultiSelect from '../MultiSelect'
import { FinishedChatsPanel } from './components/FinishedChatsPanel'
import { OpenChatsPanel } from './components/OpenChatsPanel'
import { separateChatsByStatusCloseOrArchived } from './helpers'
import { ButtonDashboard } from '../ButtonDashboard'
import { useContacts } from '@/redux/contacts'
import * as S from './styles'

export function ChatSidebar() {
  const [chatsMain, setChatsMain] = useState<ChatType[]>()
  const [closeChats, setCloseChats] = useState<ChatType[]>()

  const {
    userState: { authUser }
  } = useUser()

  const {
    chatState: { chats },
    chatDispatch
  } = useChat()

  const {
    contactsState: { contacts },
    contactsDispatch
  } = useContacts()
  console.log('teste carregamento', contacts)
  useEffect(() => {
    if (authUser?.numbers?.length) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { numbers, userId } = authUser
      const channel = createChatsChannel({
        receiverNumbers: numbers,
        userId
      })
      chatDispatch(
        listenToChatsSuccess({
          receiverNumbers: numbers,
          userId
        })
      )

      return () => {
        closeChannel(channel)
      }
    }
  }, [authUser?.numbers])

  useEffect(() => {
    if (chats?.length) {
      const { otherChats, closeOrArchivedChats } =
        separateChatsByStatusCloseOrArchived(chats)

      setChatsMain(otherChats)
      setCloseChats(closeOrArchivedChats)
    }
  }, [chats])
  /* useEffect(() => {
    contactsDispatch(fetchContactsByChatIdAsync.request({ chatId }))
  }, []) */
  return (
    <S.Wrapper>
      <S.MultiSelectWrapper>
        <S.LineSelect>
          <MultiSelect
            defaultValue={{ label: 'Vendas', value: 0 }}
            options={[
              { label: 'teste', value: 'teste' },
              { label: 'teste1', value: 'teste1' },
              { label: 'teste2', value: 'teste2' },
              { label: 'teste3', value: 'teste3' }
            ]}
            isDisabled
            onChange={console.log}
          />
        </S.LineSelect>
        <ButtonDashboard />
      </S.MultiSelectWrapper>

      <S.Container>
        <S.Tabs selectedTabClassName="selected-tab-chat">
          <S.TabList>
            <S.Tab>
              <Heading
                color={theme.colors.text.subTitle}
                headingLevel="h5"
                fontWeight="bold"
                lineHeight={1.5}
                letterSpacing="0.05em"
              >
                Chat em aberto({chatsMain?.length || 0})
              </Heading>
            </S.Tab>

            <S.Tab>
              <Heading
                color={theme.colors.text.subTitle}
                headingLevel="h5"
                fontWeight="bold"
                lineHeight={1.5}
                letterSpacing="0.05em"
              >
                Finalizados({closeChats?.length || 0})
              </Heading>
            </S.Tab>
          </S.TabList>

          <S.TabPanel>
            <OpenChatsPanel chats={chatsMain} />
          </S.TabPanel>

          <S.TabPanel>
            <FinishedChatsPanel chats={closeChats} />
          </S.TabPanel>
        </S.Tabs>
      </S.Container>
    </S.Wrapper>
  )
}
