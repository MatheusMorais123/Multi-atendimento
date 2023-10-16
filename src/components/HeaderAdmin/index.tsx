import React from 'react'
import { Container } from 'reactstrap'

import { connect } from 'react-redux'
/* import { Link, Navigate } from 'react-router-dom' */
import withRouter from '../../components/withRouter'
/* import { useFormik } from 'formik'
import * as Yup from 'yup'
import { db } from '../../helpers/firebase' */

// i18n
/* import { useTranslation } from 'react-i18next' */

// redux store
import { apiError, login } from '@/redux/auth/actions'

import './styles.scss'
// Import Images
/* import logodark from '@/assets/images/logo-dark.svg'
import logolight from '@/assets/images/logo-light.svg' */

// TODO: fix this
/* type LoginProps = {
  loginUser: (email: any, password: any, data: any) => any
  error: any
  user: any
  router: any
} */
/**
 * Login component
 * @param {*} props
 */
const Operator = (/* props: LoginProps */) => {
  return (
    <React.Fragment>
      <Container>
        <div className="headerAdmin">
          <h1>Operadores</h1>
        </div>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { user, loading, error } = state.Auth
  return { user, loading, error }
}

export default withRouter(
  connect(mapStateToProps, { login, apiError })(Operator)
)
