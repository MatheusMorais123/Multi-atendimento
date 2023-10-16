import { theme } from '@/styles/theme'
import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div``

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 ${theme.spacings.spacing_sm};
`
const fadein = keyframes`
  0% {
      opacity: 0;
  }

  100% {
      opacity: 1;
  }
`

export const ChatList = styled.div`
  height: 461px;
  overflow-y: scroll;
  animation: ${fadein} 0.35s ease-in;

  > div:last-child {
    border-bottom-left-radius: 0.25rem;
  }

  &::-webkit-scrollbar {
    margin-top: 1px;
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    background: ${theme.colors.background.light};
    border-radius: 24px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d4da;
    border-radius: 24px;
    border: 4px solid ${theme.colors.background.light};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6c757d;
  }
`
