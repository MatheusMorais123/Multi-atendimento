import styled, { css, keyframes } from 'styled-components'

const lineMove = keyframes`
  0%, 100% {
    transform: translateX(-100%)
  }
  50% {
    transform: translateX(100%)
  }
`

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    .loader {
      width: 20%;
      height: 3px;
      position: relative;
    }

    .line {
      width: 100%;
      height: 3px;
      background-color: #1ea659;
      border-radius: 2px;
      animation: ${lineMove} 1.5s ease-in-out infinite;
    }
  `}
`
