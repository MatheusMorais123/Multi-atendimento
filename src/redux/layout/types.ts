import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type LayoutState = {
  activeTab: string
  userSidebar: boolean
  conversationName: string
  layoutMode: string
}

export type LayoutAction = ActionType<typeof actions>
