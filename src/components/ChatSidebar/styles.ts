import { theme } from '@/styles/theme'
import styled, { css } from 'styled-components'
import {
  Tab as RTab,
  Tabs as RTabs,
  TabList as RTabList,
  TabPanel as RTabPanel
} from 'react-tabs'

export const Wrapper = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
    max-width: 332px;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.spacing_m};
    margin-top: 8%;
  `}
`

export const Container = styled.div`
  max-width: 332px;
  width: 100%;
  height: 568px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: ${theme.border.radius};
  padding: 0.25rem 0;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;

  .selected-tab-chat {
    border-bottom-color: #1ea659;
    outline: none;
  }
`

export const MultiSelectWrapper = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  margin-top: 16px;
`

export const Tabs = styled(RTabs)`
  width: 100%;
`
export const TabList = styled(RTabList)`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 ${theme.spacings.spacing_sm};
`

export const Tab = styled(RTab)`
  cursor: pointer;
  border-bottom: 2px solid #ced4da;
`

export const LineSelect = styled.div`
  width: 34%;
  margin-top: 14px;
`

export const TabPanel = styled(RTabPanel)``
