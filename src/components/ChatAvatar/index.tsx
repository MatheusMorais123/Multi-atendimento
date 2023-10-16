import React from 'react'
import * as S from './styles'
import { ChatAvatarProps } from './types'
import BaseText from '../BaseText'

const ChatAvatar = ({
  imageUrl,
  text,
  backgroundColor,
  width,
  height,
  fontSize = '1rem',
  fontColor = '#ffffff',
  fontWeight = 'semiBold'
}: ChatAvatarProps) => {
  function imageAvatar() {
    return (
      <S.Wrapper
        backgroundColor={backgroundColor}
        backgroundUrl={imageUrl}
        width={width}
        height={height}
      />
    )
  }

  if (imageUrl) return imageAvatar()

  return (
    <S.Wrapper backgroundColor={backgroundColor} width={width} height={height}>
      <BaseText color={fontColor} fontSize={fontSize} fontWeight={fontWeight}>
        {text?.substring(0, 2).toUpperCase() || 'DE'}
      </BaseText>
    </S.Wrapper>
  )
}

export default ChatAvatar
