import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.563rem;
  background-color: #e9ecef;
  border-radius: ${theme.border.radius};
  border: 1px solid #adb5bd;
  height: 1.75rem;
  /* width: 94px; */
  padding: 0 0.5rem;

  > img {
    cursor: pointer;
  }
`
