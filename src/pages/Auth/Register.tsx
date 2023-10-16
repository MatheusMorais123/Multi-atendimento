import React, { useCallback, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import withRouter from '../../components/withRouter'

import { useFormik } from 'formik'
import * as Yup from 'yup'
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

import { db } from '../../helpers/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'

// // i18n
import { useTranslation } from 'react-i18next'

// // Import Images
import logodark from '@/assets/images/logo-dark.svg'
import logolight from '@/assets/images/logo-light.svg'
import { apiError, register } from '@/redux/auth/actions'

// type UserData = {
//   name: string
//   email: string
//   password: string
//   is_active: boolean
//   is_admin: boolean
// }

type RegisterProps = {
  error: any
  user: any
}
// /**
//  * Register component
//  * @param {*} props
//  */
const Register = (props: RegisterProps) => {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  //   /* intilize t variable for multi language implementation */
  const { t } = useTranslation()

  const clearError = useCallback(() => {
    dispatch(apiError({ error: '' }))
  }, [dispatch])

  useEffect(() => {
    clearError()
  }, [clearError])

  //   // validation
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Campo nome é obrigátorio'),
      email: Yup.string()
        .email('Enter proper email')
        .required('Campo e-mail é obrigátorio'),
      password: Yup.string().required('Campo senha  é obrigátorio')
    }),
    onSubmit: async values => {
      try {
        const user = {
          name: values.name,
          email: values.email,
          is_active: false,
          is_admin: true,
          password: values.password,
          created_at: serverTimestamp()
        }

        const usersRef = collection(db, 'users')
        const usersQuerySnapshot = await getDocs(
          query(usersRef, where('email', '==', values.email.toLowerCase()))
        )

        if (usersQuerySnapshot.empty) {
          await addDoc(usersRef, user)
          console.log('Usuário registrado com sucesso!')
          setSuccess(true)
        } else {
          setError('Já existe um usuário com o mesmo e-mail')
        }

        dispatch(register.request(values as any))
        console.log(values)
      } catch (error) {
        console.log(error)
        setError('Já existe um usuário com o mesmo e-mail')
      }
    }
  })

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

                <h4>{t('Sign up')}</h4>
                <p className="text-muted mb-4">
                  {t('Get your Chatvia account now')}.
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  {props.error && <Alert variant="danger">{props.error}</Alert>}
                  {props.user && (
                    <Alert variant="success">
                      Thank You for registering with us!
                    </Alert>
                  )}
                  <div className="p-3">
                    <Form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <Label className="form-label">{t('Email')}</Label>
                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                          <span className="input-group-text text-muted">
                            <i className="ri-mail-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Email"
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
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">{t('Nome')}</Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          <span className="input-group-text border-light text-muted">
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Nome"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            invalid={
                              !!(formik.touched.name && formik.errors.name)
                            }
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <FormFeedback type="invalid">
                              {formik.errors.name}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </div>
                      <FormGroup className="mb-4">
                        <Label className="form-label">{t('Senha')}</Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          <span className="input-group-text border-light text-muted">
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Senha"
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
                      </FormGroup>
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
                          Criar conta
                        </Button>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          {t('By registering you agree to the Chatvia')}{' '}
                          <Link to="#" className="text-primary">
                            {t('Terms of Use')}
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  {t('Already have an account')} ?{' '}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {' '}
                    {t('Signin')}{' '}
                  </Link>{' '}
                </p>
                <p>
                  © {new Date().getFullYear()} {t('Chatvia')}.{' '}
                  {t('Crafted with')}{' '}
                  <i className="mdi mdi-heart text-danger"></i>{' '}
                  {t('by Themesbrand')}
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
  const { user, loading, error } = state.Auth
  return { user, loading, error }
}

export default withRouter(
  connect(mapStateToProps, { register, apiError })(Register)
)
