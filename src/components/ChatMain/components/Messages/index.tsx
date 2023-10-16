import InlineLoader from '@/components/InlineLoader'
import { useChat } from '@/redux/chat'
import { useMessages } from '@/redux/message'
import { fetchMoreMessagesAsync } from '@/redux/message/actions'
import React, { useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Message } from '../Message'
import * as S from './styles'
import { MessagesProps } from './types'
import { scrollToBottom } from './helpers'
import { useUser } from '@/redux/user'

export function Messages({ messages, chatId }: MessagesProps) {
  const ref = useRef()

  const {
    messageState: { hasMoreMessages },
    messagesDispatch
  } = useMessages()

  const {
    chatState: { infiniteScrollBottomHack }
  } = useChat()

  const {
    userState: { authUser }
  } = useUser()

  useEffect(() => {
    if (infiniteScrollBottomHack !== null) {
      scrollToBottom(ref)
    }
    scrollToBottom(ref)
  }, [infiniteScrollBottomHack])

  return (
    <S.Container>
      <div id="scrollableDiv" ref={ref}>
        <InfiniteScroll
          className="wrapper"
          dataLength={messages.length}
          scrollableTarget="scrollableDiv"
          next={() => {
            messagesDispatch(
              fetchMoreMessagesAsync.request({
                chatId,
                lastMessage: messages[messages.length - 1],
                userId: authUser.userId
              })
            )
          }}
          inverse={true}
          scrollThreshold={2}
          hasMore={hasMoreMessages}
          loader={
            <S.InlineLoaderWrapper>
              <InlineLoader />
            </S.InlineLoaderWrapper>
          }
        >
          <S.MessagesWrapper>
            {messages?.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </S.MessagesWrapper>
        </InfiniteScroll>
      </div>
    </S.Container>
  )
}
