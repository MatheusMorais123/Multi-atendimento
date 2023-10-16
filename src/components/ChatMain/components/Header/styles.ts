import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #ced4da;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  gap: ${theme.spacings.spacing_sm};
`

export const ChatAvatarWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 100%;
  cursor: pointer;
`

export const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const HeaderEnd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: fit-content;
  gap: ${theme.spacings.spacing_sm};
`

export const StarWrapper = styled.div``

export const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1ea659;
  border-radius: ${theme.border.radius};
  width: 100%;
  height: 100%;
  width: 49px;
  height: 32px;
`

export const Button = styled.div`
  width: 5.625rem;
  height: 2rem;
  background-color: #0d6efd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${theme.border.radius};
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`
