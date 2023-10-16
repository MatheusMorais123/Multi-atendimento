import styled, { css } from 'styled-components'
import { ControlProps as ControlPropsReactSelect } from 'react-select'
import { CSSProperties } from 'react'
import { theme } from '@/styles/theme'

type CSSProps = {
  '&:hover': CSSProperties
  div?: CSSProperties
  '::-webkit-scrollbar'?: CSSProperties
  '::-webkit-scrollbar-track'?: CSSProperties
  '::-webkit-scrollbar-thumb'?: CSSProperties
  '::-webkit-scrollbar-thumb:hover'?: CSSProperties
} & CSSProperties

type ControlProps = {
  isSelected: boolean
} & ControlPropsReactSelect

type WrapperProps = {
  iserror?: 'true' | 'false'
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ iserror }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 218px;
    margin-left: 1%;
    > div > div {
      border-color: ${iserror === 'true' ? '#a80000' : '#d1d4da'};
    }

    > label {
      color: ${iserror === 'true' ? '#a80000' : '#d1d4da'};
    }
  `}
`
// TODO: move colors to theme
export function getContainerCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    width: '100%'
  } as CSSProps

  return customStyle
}

export function getControlCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    width: '100%',
    height: '44px',
    boxShadow: 'unset',
    borderWidth: '1px',
    borderColor: '#d1d4da',
    background: state.isDisabled ? '#D1D4DA' : theme.colors.background.light,
    '&:hover': {
      borderColor: 'none'
    },
    borderBottomLeftRadius: state.menuIsOpen ? 0 : theme.border.radius,
    borderBottomRightRadius: state.menuIsOpen ? 0 : theme.border.radius
  } as CSSProps

  return customStyle
}

export function getMenuCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    boxShadow: 'unset',
    borderColor: '#d1d4da',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    border: '1px solid #d1d4da !important',
    borderTop: '0px !important',
    marginTop: '0px',

    background: theme.colors.background.light
  } as CSSProps

  return customStyle
}

export function getOptionCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    fontSize: theme.font.sizes.body.primary,
    height: '44px',
    color: '#343A40',
    borderTop: '1px',
    borderTopColor: '#d1d4da',
    borderTopStyle: 'solid',
    padding: '12px 11px',
    '&:hover': { backgroundColor: '#B3E5C9' },
    backgroundColor: state.isSelected ? '#B3E5C9' : 'transparent',
    '&:first-child': { borderTop: '0px' }
  } as CSSProps

  return customStyle
}

export function getPlaceholderCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    color: '#ADB5BD',
    fontSize: theme.font.sizes.body.primary
  } as CSSProps

  return customStyle
}

export function getIndicatorSeparatorCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    visibility: 'hidden'
  } as CSSProps

  return customStyle
}

export function getIndicatorsContainerCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    div: { color: state.isDisabled ? '#ADB5BD' : '#6C757D' }
  } as CSSProps

  return customStyle
}

export function getMenuListCustomStyles(state: ControlProps) {
  const customStyle: CSSProps = {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '::-webkit-scrollbar': {
      marginTop: '1px',
      width: '12px'
    },
    '::-webkit-scrollbar-track': {
      width: '5 px',
      background: theme.colors.background.light,
      borderRadius: '24px'
    },
    '::-webkit-scrollbar-thumb': {
      background: '#D1D4DA',
      borderRadius: '24px',
      border: `4px solid ${theme.colors.background.light}`
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  } as CSSProps

  return customStyle
}
