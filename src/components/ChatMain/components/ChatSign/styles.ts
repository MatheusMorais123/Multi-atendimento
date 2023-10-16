import styled from 'styled-components'
import Switcher from 'react-switcher-rc'

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  .custom-switch {
    position: relative;
    height: 32px;
    overflow: hidden;
    user-select: none;
  }
  .custom-switch__shape {
    position: relative;
    width: 52px;
    height: 32px;
    margin: 0;
    padding: 0;
    background: #1ea659 !important;
    border: 1px solid #1ea659 !important;
    border-radius: 100px;
    border: 0;
  }
  .custom-switch__shape:before {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background-color: #f8f9fa;
    border-radius: 100%;
    transition: linear 0.12s;
    border: 0;
    content: '';
  }
  .custom-switch__checkbox {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }
  .custom-switch__checkbox:focus {
    border: 0;
    outline: 0;
  }
  .custom-switch__checkbox:checked + .custom-switch__shape {
    background: #1ea659;
    border: 1px solid #1ea659;
    box-shadow: none;
  }
  .custom-switch__checkbox:checked + .custom-switch__shape:before {
    left: 24px;
    top: 3px;
    color: #1ea659;
    font-weight: 700;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    background: #fff;
    border: 1px solid transparent;
  }
  .custom-switch__icon-text {
    display: flex;
    justify-content: flex-end;
    margin-top: 0;
    margin-right: 10.1px;
    font-size: 12px;
    color: #1ea659;

    svg path {
      fill: #1ea659;
    }
  }
  .custom-switch__icon-text--checked {
    justify-content: flex-start;
    margin-left: 10.5px;
    color: #fff;
  }
`

export const Switch = styled(Switcher)``
