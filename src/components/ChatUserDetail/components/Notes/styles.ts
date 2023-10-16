import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const Button = styled.button`
  border: 1px solid #0d6efd;
  padding: 0.25rem 0.375rem;
  border-radius: ${theme.border.radius};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    filter: brightness(0.8);
  }
`

export const NotesContainer = styled.div`
  display: flex;
  width: 100%;
  margin: ${theme.spacings.spacing_sm} 0;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;
  height: 6.2rem;

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

export const Note = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;
  background-color: #e9ecef;
  border-radius: ${theme.border.radius};
  padding: 0.5rem;
`
