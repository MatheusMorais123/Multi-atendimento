import BaseText from '@/components/BaseText'
import React from 'react'
import noteIcon from '../../../../assets/images/icons/note.svg'
import * as S from './styles'

export function Notes() {
  return (
    <S.Wrapper>
      <S.NotesHeader>
        <BaseText>Notas</BaseText>

        <S.Button>
          <img src={noteIcon} width="15px" height="15px" />

          <BaseText color="#0D6EFD" fontSize="0.75rem" lineHeight={1}>
            Add notas
          </BaseText>
        </S.Button>
      </S.NotesHeader>

      <S.NotesContainer>
        <S.Note>
          <BaseText color="#000000" lineHeight={1.192}>
            Cliente ameaçou cancelar o seu plano se não conseguir suporte até
            amanhã.
          </BaseText>

          <BaseText color="#ADB5BD" lineHeight={1.026}>
            2 de agosto de 2023, 15h
          </BaseText>
        </S.Note>

        <S.Note>
          <BaseText color="#000000" lineHeight={1.192}>
            Cliente ameaçou cancelar o seu plano se não conseguir suporte até
            amanhã.
          </BaseText>

          <BaseText color="#ADB5BD" lineHeight={1.026}>
            2 de agosto de 2023, 15h
          </BaseText>
        </S.Note>
      </S.NotesContainer>
    </S.Wrapper>
  )
}
