import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const ThemeContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  max-width: ${theme.grid.container};
`

export const ThemeContainerInner = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  margin: 0 2%;
  width: 100%;
  height: 100%;

  max-width: ${theme.grid.containerInner};
`
