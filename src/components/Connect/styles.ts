import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  `}
`
export const Connect = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;

    button {
      border: none;
      width: 192px;
      height: 34px;
      background: #b3e5c9;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 24px;
      span {
        padding-right: 5px;
        color: #1ea659;
        font-size: 14px;
        font-weight: 400;
      }

      img {
        margin-right: 10px;
        padding-left: 5px;
      }
    }

    .outlineBtn {
      display: inline-flex;
      padding: 4px;
      justify-content: center;
      align-items: center;
      margin-right: 1rem;

      button {
        border-radius: 4px;
        width: 28px;
        height: 28px;
        background: #0d6efd;

        img {
          margin-left: 5px;
        }
      }
    }
  `}
`
