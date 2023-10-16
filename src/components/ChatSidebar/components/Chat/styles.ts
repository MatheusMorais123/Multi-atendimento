import styled, { css } from 'styled-components'

type WrapperProps = {
  isactive?: 'true' | 'false'
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ isactive }) => css`
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ced4da;
    margin-top: 0.5rem;
    cursor: pointer;

    ${isactive === 'true' &&
    css`
      border-right: 1px solid #1ea659;
    `}
  `}
`

export const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.625rem;
    width: 100%;
    padding: 0 1rem;
    padding-bottom: 1rem;
    height: 5rem;
  `}
`

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
  }
`

export const End = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-left: auto;
  height: 100%;
`

export const Date = styled.p`
  //FIXME: the Segoe UI font is free ? and can we use ?
  font-size: 0.75rem;
  line-height: 1rem;
`

export const MessagesCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6610f2;
  border-radius: 20px;
  padding: 2px 5px;
`
