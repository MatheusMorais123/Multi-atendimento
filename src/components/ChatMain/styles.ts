import { theme } from '@/styles/theme'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 568px;
    border-radius: ${theme.border.radius};
    background-color: #f8f9fa;
    padding-bottom: 2.125rem;
    border: 1px solid #dee2e6;
    margin-top: 8%;
  `}
`

export const LogoContainer = styled.div`
  ${() => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    > img {
      width: 100%;
      max-width: 600px;
    }
  `}
`

export const Content = styled.div`
  width: 100%;
`

export const End = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacings.spacing_sm};
  width: 100%;
  padding: 0 ${theme.spacings.spacing_m};
  margin-top: 8px;
`
