import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 81px;
  `}
`
export const Dashboard = styled.div`
  ${() => css`
    margin-right: 1rem;

    button {
      border: none;
      width: 146px;
      height: 44px;
      background: #1ea659;
      color: #f8f9fa;
      font-size: 16px;
      font-weight: 600;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin-right: 10px;
      }
    }
  `}
`
