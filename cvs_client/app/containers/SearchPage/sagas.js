
import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions'
import { SEARCH_PRODUCT } from './constants'
import request from 'utils/request'

const url = 'http://13.209.25.111:8000/products/?search='


export function* searchProducts(searchKey) {
  try {
    const data = yield call(request, url + searchKey)
    yield put(actions.receivedSearchResult(data))
  }
  catch (error) {
    yield put(actions.receivedSearchResult())
  }
}

// Individual exports for testing
export function* defaultSaga() {
  while (true) {
    const { searchKey } = yield take(SEARCH_PRODUCT)
    yield call(searchProducts, searchKey)
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
