// import React, { useState, useEffect } from 'react'
// import {
//   Container,
//   Form,
//   Button,
//   Input,
//   Modal,
//   ModalBody,
//   Label,
//   InputGroup,
//   FormGroup,
//   FormFeedback
// } from 'reactstrap'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import { connect } from 'react-redux'
// /* import { Link, Navigate } from 'react-router-dom' */
// import withRouter from '../../components/withRouter'
// import HeaderAdmin from '../../components/HeaderAdmin'
// /* import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import { db } from '../../helpers/firebase' */

// // i18n
// /* import { useTranslation } from 'react-i18next' */

// // redux store
// import { loginUser, apiError } from '../../redux/actions'
// import { db } from '../../helpers/firebase'
// import firebase from 'firebase/compat/app'

// import './styles.scss'
// // Import Images
// /* import logodark from '@/assets/images/logo-dark.svg'
// import logolight from '@/assets/images/logo-light.svg' */

// // TODO: fix this
// /* type LoginProps = {
//   loginUser: (email: any, password: any, data: any) => any
//   error: any
//   user: any
//   router: any
// } */
// /**
//  * Login component
//  * @param {*} props
//  */
// const Operator = (/* props: LoginProps */) => {
//   const [operators, setOperators] = useState([])
//   const [searchValue, setSearchValue] = useState('')

//   const [operatorModalOpen, setOperatorModalOpen] = useState(false)
//   const [selectedOperatorId, setSelectedOperatorId] = useState(null)
//   const [editMode, setEditMode] = useState(false)

//   const openEditOperatorModal = operatorId => {
//     setEditMode(true)
//     setSelectedOperatorId(operatorId)
//     setOperatorModalOpen(true)
//   }
//   const toggleOperatorModal = () => {
//     setOperatorModalOpen(!operatorModalOpen)
//   }

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       password: '',
//       isAdmin: false,
//       isActive: false // Definindo o valor padrão como false
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Required'),
//       email: Yup.string().email('Enter proper email').required('Required'),
//       password: Yup.string().required('Required'),
//       isAdmin: Yup.boolean().required('Required')
//     }),
//     onSubmit: async values => {
//       try {
//         const authUser = JSON.parse(localStorage.getItem('authUser'))
//         const userId = authUser?.id // Verificação opcional

//         const operatorData = {
//           name: values.name,
//           email: values.email,
//           password: values.password,
//           isAdmin: values.isAdmin,
//           isActive: false,
//           updated_at: firebase.firestore.FieldValue.serverTimestamp(),
//           user_id: userId
//         }

//         console.log('Matheus')

//         const operatorsRef = db.collection('operators')

//         if (editMode && selectedOperatorId) {
//           const operatorRef = operatorsRef.doc(selectedOperatorId)
//           await operatorRef.update(operatorData)
//         } else {
//           await operatorsRef.add(operatorData)
//         }

//         formik.resetForm()
//       } catch (error) {
//         console.error('Erro ao cadastrar/atualizar operador:', error)
//       }
//     }
//   })

//   useEffect(() => {
//     const fetchOperators = async () => {
//       try {
//         let operatorsRef

//         if (searchValue) {
//           operatorsRef = db
//             .collection('operators')
//             .where('name', '>=', searchValue)
//             .where('name', '<=', searchValue + '\uf8ff')
//             .orderBy('name')
//         } else {
//           operatorsRef = db.collection('operators')
//         }

//         const snapshot = await operatorsRef.get()
//         const operatorsData = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }))
//         setOperators(operatorsData)
//       } catch (error) {
//         console.error('Error fetching operators:', error)
//         setOperators([])
//       }
//     }

//     fetchOperators()
//   }, [searchValue])

//   const inativarOperador = operadorId => {
//     db.collection('operators')
//       .doc(operadorId)
//       .update({ isActive: true })
//       .then(() => {
//         console.log('Operador inativado com sucesso!')
//       })
//       .catch(error => {
//         console.error('Erro ao inativar o operador:', error)
//       })
//   }

//   return (
//     <React.Fragment>
//       <HeaderAdmin />
//       <div className="account-pages mt-3">
//         <Container>
//           <div className="actions">
//             <div className="row">
//               <div className="col-md-6">
//                 <Form className="searchInput">
//                   <Input
//                     placeholder="Pesquisar operadores"
//                     value={searchValue}
//                     onChange={e => setSearchValue(e.target.value)}
//                   />
//                 </Form>
//               </div>
//               <div className="col-md-6 text-primary">
//                 <Button
//                   className="btn btn-primary"
//                   onClick={toggleOperatorModal}
//                 >
//                   Novo Operador
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <fieldset className="custom-fieldset">
//             <div className="table-container">
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th scope="col">Nome</th>
//                     <th scope="col">E-mail</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Admin</th>
//                     <th scope="col">Opções</th>
//                   </tr>
//                 </thead>
//                 <tbody className="custom-tbody">
//                   {operators.map(operator => (
//                     <tr key={operator.id}>
//                       <td>{operator.name}</td>
//                       <td>{operator.email}</td>
//                       <td className={operator.isActive ? 'inativo' : 'ativo'}>
//                         <a>{operator.isActive ? 'Inativo' : 'Ativo'}</a>
//                       </td>

//                       <td>{operator.isAdmin ? 'Sim' : 'Não'}</td>
//                       <td>
//                         {/* <button
//                           className="delete-button"
//                           onClick={() => openEditOperatorModal(operator.id)}
//                         >
//                           Editar
//                         </button> */}
//                         <button
//                           className="delete-button"
//                           onClick={() => inativarOperador(operator.id)}
//                         >
//                           <i></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </fieldset>

//           <Modal
//             isOpen={operatorModalOpen}
//             toggle={toggleOperatorModal}
//             isEditing={editMode}
//           >
//             <ModalBody>
//               <div className="text-center p-4">
//                 <h5>{editMode ? 'Editar operador' : 'Adicionar operador'}</h5>
//               </div>
//               <Form onSubmit={formik.handleSubmit}>
//                 <div className="mb-3">
//                   <Label className="form-label">Nome</Label>
//                   <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
//                     <span className="input-group-text border-light text-muted">
//                       <i className="ri-user-2-line"></i>
//                     </span>
//                     <Input
//                       type="text"
//                       id="name"
//                       name="name"
//                       className="form-control form-control-lg bg-soft-light border-light"
//                       placeholder="Nome"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.name}
//                       invalid={!!(formik.touched.name && formik.errors.name)}
//                     />
//                     {formik.touched.name && formik.errors.name ? (
//                       <FormFeedback type="invalid">
//                         {formik.errors.name}
//                       </FormFeedback>
//                     ) : null}
//                   </InputGroup>
//                 </div>

//                 <div className="mb-3">
//                   <Label className="form-label">Email</Label>
//                   <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
//                     <span className="input-group-text text-muted">
//                       <i className="ri-mail-line"></i>
//                     </span>
//                     <Input
//                       type="text"
//                       id="email"
//                       name="email"
//                       className="form-control form-control-lg bg-soft-light border-light"
//                       placeholder="Enter Email"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.email}
//                       invalid={!!(formik.touched.email && formik.errors.email)}
//                     />
//                     {formik.touched.email && formik.errors.email ? (
//                       <FormFeedback type="invalid">
//                         {formik.errors.email}
//                       </FormFeedback>
//                     ) : null}
//                   </InputGroup>
//                 </div>
//                 <FormGroup className="mb-4">
//                   <Label className="form-label">Senha</Label>
//                   <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
//                     <span className="input-group-text border-light text-muted">
//                       <i className="ri-lock-2-line"></i>
//                     </span>
//                     <Input
//                       type="password"
//                       id="password"
//                       name="password"
//                       className="form-control form-control-lg bg-soft-light border-light"
//                       placeholder="Senha"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.password}
//                       invalid={
//                         !!(formik.touched.password && formik.errors.password)
//                       }
//                     />
//                     {formik.touched.password && formik.errors.password ? (
//                       <FormFeedback type="invalid">
//                         {formik.errors.password}
//                       </FormFeedback>
//                     ) : null}
//                   </InputGroup>
//                 </FormGroup>
//                 <div className="mb-3">
//                   <Label className="form-label">Administrador</Label>
//                   <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
//                     <InputGroup>
//                       <Input
//                         type="select"
//                         id="isAdmin"
//                         name="isAdmin"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.isAdmin ? 'yes' : 'no'}
//                       >
//                         <option value="yes">Sim</option>
//                         <option value="no">Não</option>
//                       </Input>
//                     </InputGroup>
//                     {/* <Label className="form-check-label" htmlFor="isAdmin">
//                     É administrador
//                   </Label> */}
//                   </InputGroup>
//                 </div>
//                 {/* Restante do formulário... */}

//                 <div className="d-grid">
//                   <Button
//                     color="primary"
//                     block
//                     className="waves-effect waves-light"
//                     type="submit"
//                   >
//                     {editMode ? 'Salvar alterações' : 'Criar operador'}
//                   </Button>
//                 </div>
//               </Form>
//             </ModalBody>
//           </Modal>
//         </Container>
//       </div>
//     </React.Fragment>
//   )
// }

// const mapStateToProps = state => {
//   const { user, loading, error } = state.Auth
//   return { user, loading, error }
// }

// export default withRouter(
//   connect(mapStateToProps, { loginUser, apiError })(Operator)
// )
