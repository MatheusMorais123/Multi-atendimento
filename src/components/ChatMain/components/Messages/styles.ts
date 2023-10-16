import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${theme.spacings.spacing_m};
`

export const Container = styled.div`
  > div {
    height: calc(375px - 2.125rem);
    display: flex;
    flex-direction: column-reverse;
    scroll-behavior: smooth;
    overflow-y: scroll;

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
  }

  .wrapper {
    display: flex;
    flex-direction: column-reverse;
    overflow-x: hidden !important;
    padding-top: ${theme.spacings.spacing_sm};
  }
`

export const MessagesWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 0 ${theme.spacings.spacing_m};
  padding-bottom: 0.5rem;
  padding-right: calc(${theme.spacings.spacing_m} - 12px);
  gap: ${theme.spacings.spacing_sm};
`

export const InlineLoaderWrapper = styled.li`
  list-style: none;
`
