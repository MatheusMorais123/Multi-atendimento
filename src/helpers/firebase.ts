import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
}

let _fireBaseBackend: Firestore = null
let _fireStore: Firestore = null
let _fireBaseStorage: FirebaseStorage = null
let auth = null
let provider = null

function initFirebaseBackend() {
  const app = initializeApp(firebaseConfig)
  // TODO: remove this
  if (!_fireBaseBackend) {
    _fireBaseBackend = getFirestore(app)
  }

  if (!_fireStore) {
    _fireStore = getFirestore(app)
  }

  if (!_fireBaseStorage) {
    _fireBaseStorage = getStorage(app)
  }

  if (!auth) {
    auth = getAuth(app)
  }

  if (!provider) {
    provider = new GoogleAuthProvider()
  }
}

function getFirebaseBackend() {
  return _fireBaseBackend
}

export {
  getFirebaseBackend,
  initFirebaseBackend,
  _fireBaseStorage,
  _fireStore,
  auth,
  provider,
  _fireBaseBackend as db
}
