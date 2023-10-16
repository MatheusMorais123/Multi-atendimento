import { theme } from '@/styles/theme'
import styled, { css, keyframes } from 'styled-components'

type WrapperProps = {
  open: boolean
}
export const Wrapper = styled.div<WrapperProps>`
  ${({ open }) => css`
    display: flex;
    height: 100%;
    max-width: 280px;
    height: 568px;
    margin-top: auto;
    position: relative;
    overflow: hidden;
    transition: width 0.5s ease-in-out;
    border: ${open ? '1px solid #dee2e6' : '0'};

    width: ${open ? '100%' : '0%'};

    ${Container} {
      right: ${open ? '0%' : '-100%'};
    }
  `}
`
const fadein = keyframes`
  0% {
      opacity: 0;
  }

  100% {
      opacity: 1;
  }
`

export const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 280px;
    flex-direction: column;
    height: 564px;
    background-color: #f8f9fa;
    border-radius: ${theme.border.radius};
    position: absolute;
    animation: ${fadein} 0.3s ease-in;

    transition: right 0.3s ease-in-out;
    /* transition: opacity 0.5s ease; */
  `}
`
