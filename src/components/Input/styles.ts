import styled, { css } from 'styled-components'
import { InputProps } from './types'
import { theme } from '@/styles/theme'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;

  > label {
    color: #a80000;
    font-size: 0.813rem;
    line-height: 1.225rem;
  }
`

type ContainerProps = Pick<InputProps, 'labelColor' | 'labelSize'>

export const Container = styled.div<ContainerProps>`
  ${({ labelColor, labelSize }) => css`
    display: flex;
    width: 100%;
    flex-direction: column;

    > label {
      font-size: ${labelSize || '0.875rem'};
      color: ${labelColor || '#343A40'};
      margin-bottom: ${`0.25rem`};
    }
  `}
`

type InputContainerProps = {
  bordercolor?: string
  borderradius?: string
  bordersize?: string
  height?: string
  iserror?: 'true' | 'false'
}

const inputContainerModifiers = {
  buildBorder: (borderSize: string, borderColor: string) => css`
    border: ${borderColor && borderSize
      ? `${borderSize} solid ${borderColor}`
      : '1px solid #D1D4DA'};
  `,
  isError: () => css`
    border-color: #a80000;
  `
}

export const InputContainer = styled.div<InputContainerProps>`
  ${({ bordercolor, borderradius, bordersize = '1px', height, iserror }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${borderradius || `1px`};
    padding: 0.75rem;
    height: ${height || `44px`};
    background-color: ${theme.colors.background.light};

    ${inputContainerModifiers.buildBorder(bordersize, bordercolor)};
    ${iserror === 'true' && inputContainerModifiers.isError()}
    > input {
      width: 100%;
      color: #343a40;
      font-size: 0.875rem;
      outline: none;
      height: 100%;
      border: none;
      background-color: ${theme.colors.background.light};

      &::placeholder {
        color: #6c757d;
      }
    }
  `}
`

const iconStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`

export const LeftIcon = styled.div`
  ${() => css`
    ${iconStyles}
    margin-right: 0.5rem;
  `}
`

export const RightIcon = styled.div`
  ${() => css`
    ${iconStyles}
    margin-left: 0.5rem;
  `}
`
