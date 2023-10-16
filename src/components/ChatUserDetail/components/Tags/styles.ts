import { theme } from '@/styles/theme'
import {
  Accordion as RAccordion,
  AccordionItem as RAccordionItem,
  AccordionItemButton as RAccordionItemButton,
  AccordionItemHeading as RAccordionItemHeading,
  AccordionItemPanel as RAccordionItemPanel
} from 'react-accessible-accordion'
import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  [hidden] {
    display: none;
  }

  width: 100%;
  height: 7rem;
  padding: 0.5rem 1rem 1rem 1rem;
  border-bottom: 1px solid #ced4da;
`

export const Accordion = styled(RAccordion)`
  width: 100%;
  /* height: 6rem; */
`

export const AccordionItem = styled(RAccordionItem)`
  & + & {
  }
`

export const AccordionItemHeading = styled(RAccordionItemHeading)`
  padding: 0 0;
  margin-bottom: 0.5rem;
`

export const AccordionItemButton = styled(RAccordionItemButton)`
  background-color: ${theme.colors.background.light};
  color: #444;
  cursor: pointer;
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  height: 43px;
  width: 100%;
  border: none;

  &::before {
    display: inline-block;
    content: '';
    height: 9px;
    width: 9px;
    margin-left: 14px;
    border-bottom: 1px solid currentColor;
    border-right: 1px solid currentColor;
    transform: rotate(-45deg);
    border-color: #6c757d;
  }

  &[aria-expanded='true']::before,
  &[aria-selected='true']::before {
    transform: rotate(45deg);
  }
`

const fadein = keyframes`
  0% {
      opacity: 0;
  }

  100% {
      opacity: 1;
  }
`

export const AccordionItemPanel = styled(RAccordionItemPanel)`
  display: flex;
  gap: 0.5rem;
  /* height: 6rem; */
  width: 100%;
  overflow-x: scroll;
  animation: ${fadein} 0.35s ease-in;

  &::-webkit-scrollbar {
    margin-top: 1px;
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    background: ${theme.colors.background.light};
    border-radius: 24px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d4da;
    border-radius: 24px;
    border: 6px solid ${theme.colors.background.light};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6c757d;
  }
`
