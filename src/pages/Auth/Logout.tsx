import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import withRouter from '../../components/withRouter'
import { logout } from '@/redux/auth/actions'

type LogoutProps = {
  router: any
}
/**
 * Logouts the user
 * @param {*} props
 */
const Logout = (props: LogoutProps) => {
  const dispatch = useDispatch()
  const { isUserLogout } = useSelector(state => ({
    // TODO: fix this
    // @ts-expect-error: Unreachable code error
    isUserLogout: state.Auth.isUserLogout
  }))

  useEffect(() => {
    dispatch(logout.request(props.router.navigate))
  }, [dispatch, props.router.navigate])

  if (isUserLogout) {
    console.log('isUserLogout', isUserLogout)
    return <Navigate to="/login" />
  }

  return <React.Fragment></React.Fragment>
}

export default withRouter(connect(null, { logout })(Logout))
