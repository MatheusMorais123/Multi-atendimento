import React, { useState } from 'react'
import { ModalDefaultProps } from './types'
import CardsModal from '../CardsModal'
import * as S from './styles'
import MultiSelect from '../MultiSelect'
import IconClose from '@/assets/images/IconClose.png'
import { Input } from '@/components/Input'
import BaseText from '../BaseText'
const ModalDefault = ({ children, onClose, ...props }: ModalDefaultProps) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelectChange = selectedOption => {
    setSelectedOption(selectedOption)
    console.log(selectedOption) // Verifique se isso é acionado
  }

  const options = [
    { label: 'Dia', value: 'dia' },
    { label: 'Mês', value: 'mês' },
    { label: 'Período', value: 'período' },
    { label: 'Setores', value: 'setores' }
  ]
  return (
    <>
      <S.Modal>
        <S.Content>
          <S.Flex>
            <S.TitleModal>Dashboard</S.TitleModal>
            <img
              onClick={onClose}
              src={IconClose}
              width="14"
              height="14"
              alt="Fechar"
              title="Fechar"
            />
          </S.Flex>

          <form>
            <S.TextForm>
              <BaseText
                fontSize="14px"
                color="#343A40"
                fontWeight="normal"
                lineHeight={1.2}
              >
                Aqui você encontra um painel com os seus principais dados de
                atendimento.
              </BaseText>
            </S.TextForm>

            <S.Filter>
              <MultiSelect
                options={options}
                onChange={handleSelectChange}
                placeholder="Filtrar por"
              />
              <S.Select>
                {selectedOption && selectedOption.value === 'dia' && (
                  <Input placeholder="Dia" type="date" />
                )}
                {selectedOption && selectedOption.value === 'mês' && (
                  <S.Spacing>
                    <Input placeholder="Mês" type="text" />
                  </S.Spacing>
                )}
                {selectedOption && selectedOption.value === 'período' && (
                  <S.Spacing>
                    <Input placeholder="Mês" type="date" />
                    <Input placeholder="Mês" type="date" />
                  </S.Spacing>
                )}
                {selectedOption && selectedOption.value === 'setores' && (
                  <Input placeholder="Setores" type="text" />
                )}
              </S.Select>
            </S.Filter>
          </form>
          <CardsModal />
        </S.Content>
      </S.Modal>
    </>
  )
}

export default ModalDefault
