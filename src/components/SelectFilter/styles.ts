import styled, { css } from 'styled-components'
import { ControlProps as ControlPropsReactSelect } from 'react-select'
import { darken } from 'polished'
import { CSSProperties } from 'react'

type CSSProps = {
  '&:hover': CSSProperties
} & CSSProperties

type ControlProps = {
  isSelected: boolean
} & ControlPropsReactSelect

export const Wrapper = styled.div`
  ${() => css`
    width: 332px;
    height: 44px;
    margin-top: 1rem;
    margin-left: 2rem;
  `}
`

export function getControlCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    boxShadow: 'unset',
    borderWidth: '1px',
    borderColor: '#D1D4DA',
    background: '#D1D4DA',
    '&:hover': {
      borderColor: darken(0.1, state.menuIsOpen ? '#2684ff' : '#CED4DA')
    }
  } as CSSProps

  return customStyle
}

export function getMenuCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    // Type css here
  } as CSSProps

  return customStyle
}

export function getOptionCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    color: '#ADB5BD',
    '&:hover': { backgroundColor: '#ADB5BD' },
    backgroundColor: state.isSelected ? '#ADB5BD' : 'transparent'
  } as CSSProps

  return customStyle
}

export function getPlaceholderCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    color: '#ADB5BD',
    fontWeight: '400',
    fontSize: '14px'
  } as CSSProps

  return customStyle
}
