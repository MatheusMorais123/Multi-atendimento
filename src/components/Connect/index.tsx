import React from 'react'
import * as S from './styles'
import { ConnectProps } from './types'
import Computer from '@/assets/images/connect.svg'
import Help from '@/assets/images/help.svg'
import { ThemeContainerInner } from '../ThemeContainer'
export function Connect({ children, ...props }: ConnectProps) {
  return (
    <S.Wrapper>
      <ThemeContainerInner>
        <S.Connect>
          <button>
            <img
              src={Computer}
              width="24"
              height="24"
              alt="Conectar ao servidor"
              title="Conectar ao servidor"
            />

            <span>Conectado ao servidor</span>
          </button>

          <div className="outlineBtn">
            <button>
              <img
                src={Help}
                width="28"
                height="28"
                alt="Ajuda"
                title="Ajuda"
              />
            </button>
          </div>
        </S.Connect>
      </ThemeContainerInner>
    </S.Wrapper>
  )
}
