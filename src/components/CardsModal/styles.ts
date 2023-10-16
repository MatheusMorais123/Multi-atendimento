import styled, { css } from 'styled-components'
export const Wrapper = styled.div`
  ${() => css`
    width: 100%;
    height: 230px;
    background: #22bf66;
  `}
`

export const Box = styled.div`
  ${() => css`
    width: 248px;
    height: 166px;
    background: #fff;
    margin-top: 5px;
    box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
    border-radius: 4px;
    color: #6c757d;
    box-sizing: border-box;
    padding: 20px;

    span {
      color: #343a40;
      font-weight: 600;
      font-size: 20px;
      margin-top: 26px;
    }

    img {
      top: -3px;
      position: relative;
    }
  `}
`

export const Row = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 17px;
    align-items: center;
    padding: 0px 20px;
  `}
`

export const ContainerFluid = styled.div`
  ${() => css`
    width: 100%;
    margin: 0 auto;
    height: 85vh;
    display: flex;
    flex-direction: column;
  `}
`

export const Container = styled.div`
  ${() => css`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  `}
`

export const Line = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`

export const CenterText = styled.div`
  ${() => css`
    padding-top: 24px;
  `}
`

export const Footer = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
      margin-top: 1rem;
      font-size: 12px;
      font-weight: 400;
      color: #6c757d;
      padding-left: 10px;
      span {
        color: #1ea659;
        font-size: 12px;
        font-weight: 400;
      }
    }

    img {
      margin-top: 15px;
    }
  `}
`

export const IconCards = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `}
`

export const BoxOpen = styled.div`
  ${() => css`
    width: 517px;
    height: 235px;
    box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
    border-radius: 4px;
    background: #fff;
    margin-left: 19px;
    margin-top: 1rem;
    margin-bottom: 30px;

    p {
      font-size: 14px;
      font-weight: 600;
      padding: 10px;
    }
  `}
`

export const Center = styled.div`
  ${() => css`
    text-align: center;
    p {
      font-weight: 400;
      font-size: 12px;
    }
  `}
`
