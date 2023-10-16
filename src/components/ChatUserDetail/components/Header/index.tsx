import BaseText from '@/components/BaseText'
import React from 'react'
import closeIcon from '../../../../assets/images/icons/close.svg'
import * as S from './styles'
import { HeaderProps } from './types'

export function Header({ onClose }: HeaderProps) {
  return (
    <S.Wrapper>
      <S.HeaderMain>
        <BaseText color="#6C757D" fontWeight="semiBold" lineHeight={1.5}>
          Informações do contato
        </BaseText>

        <BaseText fontSize="0.75rem" lineHeight={1} color="#6C757D">
          Observações gerais
        </BaseText>
      </S.HeaderMain>

      <img
        src={closeIcon}
        onClick={onClose}
        alt="Fechar"
        width="14px"
        height="14px"
      />
    </S.Wrapper>
  )
}
