import { theme } from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  flex-direction: column;
  gap: ${theme.spacings.spacing_sm};
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 7.25px;
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #b3e5c9;
  width: 100%;
  /* max-width: 560px; */
  height: 66px;
  border-radius: 36px;
  padding: 0 12px;
  gap: 6px;
  > form {
    width: 100%;

    > input {
      width: 100%;
      font-size: 1.125rem;
      line-height: 1.532rem;
      border: none;
      background-color: #f8f9fa;
      outline: none;
      color: #9da3a7;

      &::placeholder {
        color: #9da3a7;
      }
    }
  }

  > img {
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  > img {
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`

export const RecordWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42.75px;
  min-width: 42.75px;
  height: 42.75px;
  border-radius: 50%;
  background-color: #00927c;
  color: #fff;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`
