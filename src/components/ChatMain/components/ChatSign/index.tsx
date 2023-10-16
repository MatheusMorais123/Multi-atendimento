import React from 'react'
import BaseText from '../../../BaseText'
import * as S from './styles'
import { ChatSignProps } from './types'

export function ChatSign({ signState, onSign }: ChatSignProps) {
  const onHandleChange = e => {
    onSign(e.target.checked)
  }

  return (
    <S.Wrapper>
      <BaseText lineHeight={2}>Assinar mensagem</BaseText>

      <S.Switch
        name="my-switcher"
        onChange={onHandleChange}
        checked={signState}
      />
    </S.Wrapper>
  )
}
