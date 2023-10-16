import { ActionType, createReducer } from 'typesafe-actions'
import {
  changeLayoutMode,
  closeUserSidebar,
  openUserSidebar,
  setActiveTab,
  setConversationNameInOpenChat
} from './actions'
import { LayoutAction, LayoutState } from './types'

const initialState: LayoutState = {
  activeTab: 'chat',
  userSidebar: false,
  conversationName: '',
  layoutMode: 'light'
}

export const layoutReducer = createReducer<LayoutState, LayoutAction>(
  initialState
)
  .handleAction(
    setActiveTab,
    (
      state: LayoutState,
      action: ActionType<typeof setActiveTab>
    ): LayoutState => ({
      ...state,
      activeTab: action.payload.tabId
    })
  )
  .handleAction(
    openUserSidebar,
    (state: LayoutState): LayoutState => ({
      ...state,
      userSidebar: true
    })
  )
  .handleAction(
    closeUserSidebar,
    (state: LayoutState): LayoutState => ({
      ...state,
      userSidebar: true
    })
  )
  .handleAction(
    setConversationNameInOpenChat,
    (
      state: LayoutState,
      action: ActionType<typeof setConversationNameInOpenChat>
    ): LayoutState => ({
      ...state,
      conversationName: action.payload.conversationName
    })
  )
  .handleAction(
    changeLayoutMode,
    (
      state: LayoutState,
      action: ActionType<typeof changeLayoutMode>
    ): LayoutState => ({
      ...state,
      layoutMode: action.payload.layoutMode
    })
  )
