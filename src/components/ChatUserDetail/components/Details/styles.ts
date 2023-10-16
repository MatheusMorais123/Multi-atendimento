import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${theme.spacings.spacing_m} ${theme.spacings.spacing_sm}
    ${theme.spacings.spacing_sm} ${theme.spacings.spacing_sm};

  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ced4da;
`

export const DetailsHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.75rem;
`

export const DetailsHeaderContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const DetailsHeaderMain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`

export const BaseTextWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

export const Edit = styled.div``
