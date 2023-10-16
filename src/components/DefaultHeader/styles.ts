import styled, { css } from 'styled-components'
import Computer from '@/assets/images/connect.svg'

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 81px;
    background: #1ea659;
  `}
`
export const Header = styled.div`
  ${() => css`
    width: 100%;
    height: 81px;
  `}
`
export const Row = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
    padding: 10px;
  `}
`
export const Title = styled.div`
  ${() => css`
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-left: 1.5rem;

    img {
      margin-left: 10px;
    }
  `}
`
export const Icon = styled.div`
  ${() => css`
    color: #fff;
    margin-right: 20px;

    &::before {
      content: '';
      width: 28px;
      height: 27px;
      background: #ffde21;
      border-radius: 30px;
      position: absolute;
      top: 12px;
      margin-left: 8px;
    }

    p {
      position: absolute;
      top: 11px;
      margin-left: 12px;
      font-size: 16px;
      font-weight: 400px;
      color: #343a40;
      letter-spacing: 0.8px;
      font-weight: 400;
      line-height: 28px;
    }

    button {
      border: none;
      background: none;
    }
  `}
`

export const User = styled.div`
  ${() => css`
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    display: flex;
  `}
`
export const Photo = styled.div`
  ${() => css`
    width: 24px;
    height: 24px;
    margin-right: 20px;

    img {
      border-radius: 50%;
    }
  `}
`

export const Link = styled.div`
  ${() => css`
    > svg {
      margin-left: 10px;
    }

    .dropContent {
      width: 130px;
      height: 103px;
      background: #1ea659;
      position: absolute;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 4px;
      z-index: 999;

      ul {
        padding: 0;

        li {
          list-style: none;
          margin-bottom: 8px;

          a {
            text-decoration: none;
            color: #fff !important;
            font-size: 14px;
            font-weight: 400;
            line-height: 26px;
            cursor: pointer;
            padding-left: 5px;
            margin-top: 10px;
          }

          img {
            width: 19px;
            height: 19px;
          }
        }
      }
    }
  `}
`

export const Dashboard = styled.div`
  ${() => css`
    display: flex;
    align-items: center;

    button {
      padding: 0.625rem 1.9725rem;
      background-color: #1ea659;
      border-radius: 4px;
      margin-top: 20px;
      color: #fff;
      font-weight: 600;
      border: none;
      margin-right: 2rem;
    }
  `}
`

export const Connect = styled.div`
  ${() => css`
    display: flex;
    justify-content: right;
    padding-right: 3rem;

    span {
      padding: 0.625rem 1.9725rem;
      background-color: #b3e5c9;
      border-radius: 16rem;
      margin-top: 20px;
      color: #1ea659;
      font-weight: 400;
      margin-right: 28px;

      &::before {
        content: '';
        background-image: url(${Computer});
        background-size: cover;
        background-position: left;
        width: 21px;
        position: absolute;
        height: 21px;
        right: 21.6rem;
      }
    }

    button {
      border: none;
      background: #0d6efd;
      margin-top: 20px;
      border-radius: 18%;
      width: 45px;
      margin-right: 2.1rem;
    }
  `}
`
