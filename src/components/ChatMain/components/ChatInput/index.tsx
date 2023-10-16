import useToggleModal from '@/hooks/useToggleModal'
import { useChat } from '@/redux/chat'
import { useMessages } from '@/redux/message'
import { createMessageAsync } from '@/redux/message/actions'
import { useUser } from '@/redux/user'
import EmojiPicker from 'emoji-picker-react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  UncontrolledTooltip
} from 'reactstrap'
import attachIcon from '../../../../assets/images/icons/attach.svg'
import camIcon from '../../../../assets/images/icons/cam.svg'
import faceIcon from '../../../../assets/images/icons/face.svg'
import micIcon from '../../../../assets/images/icons/mic.svg'
import { ChatSign } from '../ChatSign'
import * as S from './styles'

export function ChatInput() {
  const [textMessage, setTextMessage] = useState('')
  const [chatSignState, setChatSignState] = useState(true)
  const [file, setFile] = useState<File>(null)

  const onEmojiClick = event => {
    setTextMessage(textMessage + event.emoji)
  }

  const { isOpen, toggleModal } = useToggleModal()

  const {
    userState: { authUser }
  } = useUser()

  const {
    chatState: { activeChat }
  } = useChat()
  const { messagesDispatch } = useMessages()

  const onAddMessage = (
    e: FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement>,
    textMessage: string,
    messageFile: File
  ) => {
    e.preventDefault()
    if (!textMessage) return

    handleSendMessage(textMessage, messageFile)
  }

  function handleSendMessage(textMessage: string, messageFile: File) {
    messagesDispatch(
      createMessageAsync.request({
        userId: authUser.userId,
        message: {
          file: messageFile && messageFile,
          messageText: textMessage,
          senderNumber: activeChat.receiverNumber,
          senderId: authUser.id,
          operator: chatSignState
            ? { id: authUser.id, name: authUser.name }
            : null,
          receiverNumber: activeChat.requesterNumber,
          chatId: activeChat.id
        }
      })
    )

    setTextMessage('')
    setFile(null)
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.InputContainer>
          <li className="list-inline-item" style={{ margin: 0 }}>
            <ButtonDropdown
              className="emoji-dropdown"
              direction="up"
              isOpen={isOpen}
              toggle={() => toggleModal({ state: !isOpen })}
            >
              <DropdownToggle
                id="emoji"
                color="link"
                style={{ color: '', padding: '0px' }}
              >
                <img src={faceIcon} alt="Emoji" width="20px" height="20px" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </DropdownMenu>
            </ButtonDropdown>
            <UncontrolledTooltip target="emoji" placement="top">
              Emoji
            </UncontrolledTooltip>
          </li>

          <form onSubmit={e => onAddMessage(e, textMessage, file)}>
            <input
              placeholder="Escreva uma mensagem"
              value={textMessage}
              onChange={e => setTextMessage(e.target.value)}
            />

            <input type="submit" hidden />
          </form>

          <S.IconWrapper>
            <li className="list-inline-item input-file" style={{ margin: 0 }}>
              <Label id="files" className="text-decoration-none">
                <img
                  src={attachIcon}
                  alt="Anexar arquivo"
                  width="24px"
                  height="24px"
                />
                <Input
                  onChange={e => handleSendMessage('', e.target.files[0])}
                  type="file"
                  name="fileInput"
                  size={60}
                />
              </Label>
              <UncontrolledTooltip target="files" placement="top">
                Attached File
              </UncontrolledTooltip>
            </li>

            <img src={camIcon} alt="Enviar foto" width="20px" height="18px" />
          </S.IconWrapper>
        </S.InputContainer>

        <S.RecordWrapper>
          <img src={micIcon} alt="Gravar audio" width="15px" height="20.31px" />
        </S.RecordWrapper>
      </S.Container>

      <ChatSign signState={chatSignState} onSign={setChatSignState} />
    </S.Wrapper>
  )
}
