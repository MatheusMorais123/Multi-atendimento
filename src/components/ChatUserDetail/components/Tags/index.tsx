import BaseText from '@/components/BaseText'
import React from 'react'
import 'react-accessible-accordion/dist/fancy-example.css'
import * as S from './styles'
import { Tag } from './Tag'

export function Tags() {
  return (
    <S.Wrapper>
      <S.Accordion allowZeroExpanded preExpanded={['a']}>
        <S.AccordionItem uuid="a">
          <S.AccordionItemHeading>
            <S.AccordionItemButton>
              <BaseText fontWeight="semiBold" lineHeight={1.75}>
                Tags
              </BaseText>
            </S.AccordionItemButton>
          </S.AccordionItemHeading>

          <S.AccordionItemPanel>
            <Tag name="Suporte" />

            <Tag name="Promoções" />
            <Tag name="Suporte" />
            <Tag name="Suporte" />
          </S.AccordionItemPanel>
        </S.AccordionItem>
      </S.Accordion>
    </S.Wrapper>
  )
}
