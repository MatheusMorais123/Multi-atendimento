import React, { useState } from 'react'
import * as S from './styles'
import { ButtonDashboardProps } from './types'
import ModalDefault from '../ModalDefault'
import Chart from '@/assets/images/Chart.svg'
export function ButtonDashboard({ children, ...props }: ButtonDashboardProps) {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <S.Wrapper>
      <S.Dashboard>
        <button onClick={toggle}>
          <img
            src={Chart}
            width="24"
            height="24"
            alt="Dashboard"
            title="Dashboard"
          />
          Dashboard
        </button>
      </S.Dashboard>

      {modal ? (
        <ModalDefault
          onClose={() => {
            setModal(false)
          }}
        />
      ) : null}
    </S.Wrapper>
  )
}
