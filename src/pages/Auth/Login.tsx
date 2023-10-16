import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Alert,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup
} from 'reactstrap'
import { connect, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import withRouter from '../../components/withRouter'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { db, auth } from '../../helpers/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
// // i18n
import { useTranslation } from 'react-i18next'
import { apiError, login } from '@/redux/auth/actions'

import logodark from '@/assets/images/logo-dark.svg'
import logolight from '@/assets/images/logo-light.svg'
import { useUser } from '@/redux/user'
import { saveAuthUser } from '@/redux/user/actions'

// // TODO: fix this
type LoginProps = {
  error: any
  user: any
  router: any
}
// /**
//  * Login component
//  * @param {*} props
//  */
const Login = (props: LoginProps) => {
  const dispatch = useDispatch()
  const { userDispatch } = useUser()
  /// * intilize t variable for multi language implementation */
  const { t } = useTranslation()

  const clearError = useCallback(() => {
    dispatch(apiError({ error: '' }))
  }, [dispatch])

  useEffect(() => {
    clearError()
  }, [clearError])
  /* const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false) */
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Por favor digite o e-mail'),
      password: Yup.string().required('Por favor digite a senha')
    }),
    onSubmit: async values => {
      const { email, password } = values
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log('Usuário logado com sucesso!', userCredential.user)

        const userRef = collection(db, 'users')
        const userQuerySnapshot = await getDocs(
          query(userRef, where('email', '==', email))
        )

        if (!userQuerySnapshot.empty) {
          const user = userQuerySnapshot.docs[0].data()
          if (user.isActive) {
            console.log('Usuário inativo. Acesso não permitido.')
            setError('Usuário inativo. Acesso não permitido.')
            return
          }
          localStorage.setItem(
            'authUser',
            JSON.stringify({ id: userQuerySnapshot.docs[0].id, ...user })
          )

          userDispatch(
            saveAuthUser({
              email: user.email,
              name: user.name,
              numbers: user.numbers.map(number => +number),
              id: userQuerySnapshot.docs[0].id,
              userId: user.userId
            })
          )
          // Router.push('/dashboard')
          setSuccess(true)
          return
        }

        const operatorsRef = collection(db, 'operators')
        const operatorsQuerySnapshot = await getDocs(
          query(operatorsRef, where('email', '==', email))
        )

        if (!operatorsQuerySnapshot.empty) {
          const operatorCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          )

          console.log(operatorCredential)

          console.log('Operador logado com sucesso!', operatorCredential.user)

          const operator = operatorsQuerySnapshot.docs[0].data()
          localStorage.setItem(
            'authUser',
            JSON.stringify({
              id: operatorsQuerySnapshot.docs[0].id,
              ...operator
            })
          )

          userDispatch(
            saveAuthUser({
              email: operator.email,
              name: operator.name,
              numbers: operator.numbers.map(number => +number),
              id: operatorsQuerySnapshot.docs[0].id,
              userId: operator.userId
            })
          )
          // Router.push('/dashboard')
          return
        }
        console.log('Email ou senha inválidos.')
        setError('Email ou senha inválidos.')
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          console.error('Email ou senha inválidos.')
          setError('Email ou senha inválidos.')
        } else if (error.code === 'auth/user-not-found') {
          console.error('Usuário não encontrado.')
          setError('E-mail não encontrado.')
        } else if (error.code === 'auth/email-already-in-use') {
          console.error('Este e-mail já está em uso por outro usuário.')
          setError('Este e-mail já está em uso por outro usuário.')
        } else if (error.code === 'auth/weak-password') {
          console.error('A senha deve ter pelo menos 6 caracteres.')
          setError('A senha deve ter pelo menos 6 caracteres.')
        } else {
          console.error('Ocorreu um erro ao fazer login:', error)
          setError('Ocorreu um erro ao fazer login.')
        }
      }
    }
  })

  if (
    localStorage.getItem('authUser') ||
    localStorage.getItem('authOperator')
  ) {
    return <Navigate to="/" />
  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-4">
                <Link to="/" className="auth-logo mb-5 d-block">
                  <img
                    src={logodark}
                    alt=""
                    height="80"
                    className="logo logo-dark"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="80"
                    className="logo logo-light"
                  />
                </Link>

                <p className="text-muted mb-4">
                  {t('Entra para continuar com DevChat')}.
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  {props.error && <Alert color="danger">{props.error}</Alert>}
                  <div className="p-3">
                    <Form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <Label className="form-label">{t('E-mail')}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span
                            className="input-group-text text-muted"
                            id="basic-addon3"
                          >
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Digite o email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            invalid={
                              !!(formik.touched.email && formik.errors.email)
                            }
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <FormFeedback type="invalid">
                              {formik.errors.email}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                        {/*  {emailError && <div>Email não encontrado</div>} */}
                      </div>

                      <FormGroup className="mb-4">
                        <div className="float-end">
                          <Link
                            to="forget-password"
                            className="text-muted font-size-13"
                          >
                            {t('Esqueceu a senha ?')}
                          </Link>
                        </div>
                        <Label className="form-label">{t('Senha')}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span className="input-group-text text-muted">
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Digite a senha"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            invalid={
                              !!(
                                formik.touched.password &&
                                formik.errors.password
                              )
                            }
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <FormFeedback type="invalid">
                              {formik.errors.password}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                        {/* {passwordError && <div>Senha inválida</div>} */}
                      </FormGroup>

                      <div className="form-check mb-4">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="remember-check"
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="remember-check"
                        >
                          {t('Lembrar de mim')}
                        </Label>
                      </div>
                      {success && (
                        <div className="error-message success-message">
                          Usuário registrado com sucesso!
                        </div>
                      )}
                      {error && <div className="error-message">{error}</div>}
                      <div className="d-grid mt-4">
                        <Button
                          color="primary"
                          block
                          className=" waves-effect waves-light"
                          type="submit"
                        >
                          {t('Entrar')}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  <Link
                    to="/register"
                    className="font-weight-medium text-primary"
                  >
                    {' '}
                    {t('Cadastre-se')}{' '}
                  </Link>{' '}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  console.log(JSON.stringify(state))
  const { user, loading, error } = state.authReducer
  return { user, loading, error }
}
export default withRouter(connect(mapStateToProps, { login, apiError })(Login))
