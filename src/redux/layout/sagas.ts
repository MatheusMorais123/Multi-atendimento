// @flow
import { all, call, fork, takeEvery } from 'redux-saga/effects'
import { changeLayoutMode } from './actions'

function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value)
  return true
}

function* changelayoutModeSaga({ payload: layoutMode }) {
  try {
    if (layoutMode === 'light') {
      yield call(changeBodyAttribute, 'data-bs-theme', layoutMode)
      localStorage.setItem('layoutMode', layoutMode)
    } else if (layoutMode === 'dark') {
      yield call(changeBodyAttribute, 'data-bs-theme', layoutMode)
      localStorage.setItem('layoutMode', layoutMode)
    }
  } catch (error) {}
}

export function* watchChangelayoutMode() {
  yield takeEvery(changeLayoutMode, changelayoutModeSaga)
}

function* LayoutSaga() {
  yield all([fork(watchChangelayoutMode)])
}

export default LayoutSaga
