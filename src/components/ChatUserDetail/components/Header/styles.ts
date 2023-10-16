import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 100%;
  padding: ${theme.spacings.spacing_m} ${theme.spacings.spacing_m} 0.75rem
    ${theme.spacings.spacing_m};
  border-bottom: 1px solid #ced4da;

  > img {
    cursor: pointer;
  }
`

export const HeaderMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`
