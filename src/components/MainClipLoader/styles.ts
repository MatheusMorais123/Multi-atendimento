import styled, { css } from 'styled-components'

type WrapperProps = {
  offsetHeight: number
}
export const Wrapper = styled.div<WrapperProps>`
  ${({ offsetHeight }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: calc(100vh - ${offsetHeight}px);
  `}
`
