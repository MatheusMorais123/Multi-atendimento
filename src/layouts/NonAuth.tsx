import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import withRouter from '../components/withRouter'
// import { changeLayoutMode } from '../redux/actions'
import { changeLayoutMode } from '@/redux/layout/actions'
import { LayoutState } from '@/redux/layout/types'
import { ApplicationState } from '@/redux/store'

type NonAuthProps = {
  children: ReactNode
  router: any
}

function NonAuth(props: NonAuthProps) {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  //   this.capitalizeFirstLetter.bind(this)
  // }

  const { layoutMode } = useSelector<ApplicationState, LayoutState>(
    rootReducer => rootReducer.layoutReducer
  )

  const dispatch = useDispatch()

  const capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }

  useEffect(() => {
    const getLayoutMode = localStorage.getItem('layoutMode')
    dispatch(changeLayoutMode({ layoutMode: getLayoutMode }))

    if (getLayoutMode) {
      dispatch(changeLayoutMode({ layoutMode: getLayoutMode }))
    } else {
      dispatch(changeLayoutMode({ layoutMode }))
    }

    const currentage = capitalizeFirstLetter(props.router.location.pathname)

    document.title =
      currentage + ' | Chatvia - Responsive Bootstrap 5 Admin Dashboard'
  }, [])

  return <React.Fragment>{props.children}</React.Fragment>
}

export default withRouter(NonAuth)
