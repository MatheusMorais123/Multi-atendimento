import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacings.spacing_sm};
  position: relative;
`
