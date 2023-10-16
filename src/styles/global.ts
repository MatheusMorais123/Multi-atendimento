import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%;// 14px
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    background-color: #E9ECEF;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 400;
    color: #6C757D;
  }

  h1 {
    font-size: 3rem;
    line-height: 3.25rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 2.75rem;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 2.375rem;
  }

  h4 {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  h5 {
    font-size: 1rem;
    line-height: 1.75rem;
  }

  p, span, label {
    font-size: 0.875rem;
    line-height: 1.625rem;
    color: #6C757D;
    margin: 0;
    padding: 0;
  }

  input {
    font-size: 0.875rem;
    line-height: 1.225rem;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }


`
