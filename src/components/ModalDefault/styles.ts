import styled, { css } from 'styled-components'

export const Header = styled.div`
  ${() => css`
    width: 100%;
    height: 81px;
    background: #1ea659;
  `}
`

export const Row = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin-top: 15px;
    padding: 10px;
  `}
`

export const Modal = styled.div`
  ${() => css`
    width: 568px !important;
    height: 100%;
    background: #f8f9fa;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 20px;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    transition: opacity 0.15s linear;
  `}
`

export const TitleModal = styled.div`
  ${() => css`
    font-size: 24px;
    color: #343a40;
    font-weight: 600;
  `}
`

export const Flex = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ced4da;
    padding: 20px;
    position: absolute;
    width: 98%;
    z-index: 999;
    background: #f8f9fa;

    img {
      margin-top: 15px;
      cursor: pointer;
    }
  `}
`

export const Content = styled.div`
  ${() => css`
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100% !important;

    &::-webkit-scrollbar {
      margin-top: 1px;
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      width: 5px;
      background: #ced4da;
      border-radius: 24px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d1d4da;
      border-radius: 24px;
      border: 4px solid #dee2e6;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #6c757d;
    }

    form {
      padding: 11px;
      margin-top: 6rem;
      padding-left: 1rem;

      button {
        float: right;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #fff;
        border-radius: 6px;
        cursor: pointer;
        text-decoration: none;
        font-size: 16px;
        background-color: #0d6efd;
        padding: 1rem;
        color: #f8f9fa;
        height: 44px;
        margin-top: 20px;
      }

      .cancel {
        background: #f8f9fa;
        color: #0d6efd;
        border: 1px solid #0d6efd;
        height: 40px;
        margin-top: 23px;
        margin-right: 10px;
      }
    }
  `}
`

export const Filter = styled.div`
  ${() => css`
    position: relative;
    margin-top: 20px;
    display: flex;
    width: 100%;
    gap: 4%;
  `}
`

export const Spacing = styled.div`
  ${() => css`
    display: flex;
    padding-right: 11px;
  `}
`

export const Select = styled.div`
  ${() => css``}
`

export const TextForm = styled.div`
  ${() => css`
    margin-left: 5px;
  `}
`
