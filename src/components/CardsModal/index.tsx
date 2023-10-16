import React from 'react'
import * as S from './styles'
import QTD from '@/assets/images/IconQTD.svg'
import IconOpen from '@/assets/images/IconOpen.svg'
import IconTime from '@/assets/images/IconTime.svg'
import IconGraphUp from '@/assets/images/IconGraphUp.svg'
import IconAverage from '@/assets/images/IconAverage.svg'
import Empty from '@/assets/images/Empty.svg'
import IconGraphDown from '@/assets/images/IconGraphDown.svg'
import BaseText from '../BaseText'
export default function CardsModal() {
  return (
    <S.Container>
      <S.Row>
        <S.Box>
          <S.Line>
            <BaseText
              fontSize="14px"
              color="#6C757D"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              Qtd. atendimentos
            </BaseText>

            <img
              src={QTD}
              alt="QTD atendimentos"
              title="QTD atendimentos"
              width="32"
              height="32"
            />
          </S.Line>

          <S.CenterText>
            <BaseText
              fontSize="20px"
              color="#343A40"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              105
            </BaseText>
          </S.CenterText>

          <S.Footer>
            <img src={IconGraphUp} width="24" height="24" />

            <p>
              <span>17%</span> na última semana
            </p>
          </S.Footer>
        </S.Box>

        <S.Box>
          <S.Line>
            <BaseText
              fontSize="14px"
              color="#6C757D"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              Atendimentos abertos
            </BaseText>

            <img
              src={IconOpen}
              alt="Atendimentos abertos"
              title="Atendimentos abertos"
              width="32"
              height="32"
            />
          </S.Line>

          <S.CenterText>
            <BaseText
              fontSize="20px"
              color="#343A40"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              22
            </BaseText>
          </S.CenterText>

          <S.Footer>
            <img src={IconGraphUp} width="24" height="24" />

            <p>
              <span>2,5%</span> na última semana
            </p>
          </S.Footer>
        </S.Box>

        <S.Box>
          <S.Line>
            <BaseText
              fontSize="14px"
              color="#6C757D"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              Tempo de respota
            </BaseText>
            <img
              src={IconTime}
              alt="Tempo de resposta"
              title="Tempo de resposta"
              width="32"
              height="32"
            />
          </S.Line>

          <S.CenterText>
            <BaseText
              fontSize="20px"
              color="#343A40"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              00:05:08
            </BaseText>
          </S.CenterText>

          <S.Footer>
            <img src={IconGraphDown} width="24" height="24" />

            <p>
              <span>-20%</span> na última semana
            </p>
          </S.Footer>
        </S.Box>

        <S.Box>
          <S.Line>
            <BaseText
              fontSize="14px"
              color="#6C757D"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              Média de avaliações
            </BaseText>

            <img
              src={IconAverage}
              alt="Média de avaliações"
              title="Média de avaliações"
              width="32"
              height="32"
            />
          </S.Line>

          <S.CenterText>
            <BaseText
              fontSize="20px"
              color="#343A40"
              fontWeight="semiBold"
              lineHeight={1.2}
            >
              4,8
            </BaseText>
          </S.CenterText>

          <S.Footer>
            <img src={IconGraphUp} width="24" height="24" />

            <p>
              <span>0,5%</span> na última semana
            </p>
          </S.Footer>
        </S.Box>
      </S.Row>

      <S.BoxOpen>
        <BaseText
          fontSize="14px"
          color="#6C757D"
          fontWeight="semiBold"
          lineHeight={1.2}
        >
          Atendimentos
        </BaseText>

        <S.Center>
          <img src={Empty} width="100" height="100" />

          <p>Não há dados a serem exibidos</p>
        </S.Center>
      </S.BoxOpen>
    </S.Container>
  )
}
