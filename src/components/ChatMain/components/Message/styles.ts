import { theme } from '@/styles/theme'
import styled, { css } from 'styled-components'

type WrapperProps = {
  issender?: 'true' | 'false'
}

const wrapperModifier = {
  before: (issender: string) => css`
    &::before {
      content: '';
      position: absolute;
      border: 15px solid transparent;
      z-index: ${theme.layers.base};
      border-top-color: ${issender === 'true' ? '#D3FFC8' : '#E9ECEF'};
      left: -13px;
      right: auto;
      top: 0;
    }
  `,
  after: (issender: string) => css`
    &::after {
      content: '';
      position: absolute;
      border: 15px solid transparent;
      border-top-color: ${issender === 'true' ? '#D3FFC8' : '#E9ECEF'};
      left: auto;
      right: -13px;
      top: 0;
    }
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ issender }) => css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: max-content;
    max-width: 50%;
    padding: 0.5rem;
    background-color: ${issender === 'true' ? '#D3FFC8' : '#E9ECEF'};
    border-radius: ${theme.border.radius};
    flex-direction: column;
    gap: 0.25rem;
    position: relative;
    margin-left: ${issender === 'true' ? 'auto' : 'unset'};

    ${issender === 'true'
      ? wrapperModifier.after(issender)
      : wrapperModifier.before(issender)}
  `}
`
