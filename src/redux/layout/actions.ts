import { createAction } from 'typesafe-actions'

export const setActiveTab = createAction('@layout/SET_ACTIVE_TAB')<{
  tabId: string
}>()

export const openUserSidebar = createAction(
  '@layout/OPEN_USER_PROFILE_SIDEBASE'
)()

export const closeUserSidebar = createAction(
  '@layout/CLOSE_USER_PROFILE_SIDEBAR'
)()

export const setConversationNameInOpenChat = createAction(
  '@layout/SET_CONVERSATION_NAME_IN_OPEN_CHAT'
)<{ conversationName: string }>()

export const changeLayoutMode = createAction('@layout/SET_LAYOUT_MODE')<{
  layoutMode: string
}>()
