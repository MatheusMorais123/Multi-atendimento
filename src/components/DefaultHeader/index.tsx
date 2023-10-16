import photo from '@/assets/images/Face.jpg'
import Logo from '@/assets/images/IconLogo.svg'
import Off from '@/assets/images/Off.svg'
import Language from '@/assets/images/languageOutline.svg'
import Moon from '@/assets/images/moon.svg'
import notification from '@/assets/images/notification.svg'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { ThemeContainerInner } from '../ThemeContainer'
import * as S from './styles'
import { DefaultHeaderProps } from './types'

export function DefaultHeader({ children, ...props }: DefaultHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <S.Wrapper>
      <ThemeContainerInner>
        <S.Header>
          <S.Row>
            <S.Title>
              Dev Chat
              <img src={Logo} width="22" height="17" />
            </S.Title>
            <S.User>
              <S.Icon>
                <button>
                  <img src={notification} width="24" height="24" />
                </button>
                <p>12</p>
              </S.Icon>

              <S.Photo>
                <img src={photo} />
              </S.Photo>

              <S.Link onClick={toggleDropdown}>
                <a>Matheus Morais</a>
                <FaChevronDown />

                {isDropdownOpen && (
                  <div className="dropContent">
                    <ul>
                      <li>
                        <img src={Moon} />

                        <a>Modo Escuro</a>
                      </li>

                      <li>
                        <img src={Language} />

                        <a>EN-US</a>
                      </li>

                      <li>
                        <img src={Off} />

                        <a>Sair</a>
                      </li>
                    </ul>
                  </div>
                )}
              </S.Link>
            </S.User>
          </S.Row>
        </S.Header>
      </ThemeContainerInner>
    </S.Wrapper>
  )
}
