import React from 'react'
import * as S from './styles'
import BaseText from '@/components/BaseText'
import { TagProps } from './types'
import closeIcon from '../../../../../assets/images/icons/close.svg'

export function Tag({ name }: TagProps) {
  return (
    <S.Wrapper>
      <BaseText lineHeight={1.5}>{name}</BaseText>

      <img src={closeIcon} width="14px" height="14px" />
    </S.Wrapper>
  )
}
