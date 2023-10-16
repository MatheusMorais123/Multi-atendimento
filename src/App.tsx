import React, { useEffect } from 'react'
import Routes from './routes'
import './assets/scss/themes.scss'
import { useSelector } from 'react-redux'
import { ApplicationState } from './redux/store'
import { LayoutState } from './redux/layout/types'
import { initFirebaseBackend } from './helpers/firebase'
import { useUser } from './redux/user'
import { saveAuthUser } from './redux/user/actions'

initFirebaseBackend()

function App() {
  const { layoutMode } = useSelector<ApplicationState, LayoutState>(
    rootReducer => rootReducer.layoutReducer
  )

  const { userDispatch } = useUser()

  useEffect(() => {
    const authUser = localStorage.getItem('authUser')

    if (authUser) {
      const parsedAuthUser = JSON.parse(authUser)

      userDispatch(
        saveAuthUser({
          email: parsedAuthUser.email,
          name: parsedAuthUser.name,
          numbers: parsedAuthUser.numbers?.map(number => +number),
          id: parsedAuthUser.id,
          userId: parsedAuthUser.userId
        })
      )
    }
  }, [])

  useEffect(() => {
    layoutMode && localStorage.setItem('layoutMode', layoutMode)
  }, [layoutMode])

  return <Routes />
}

export default App
