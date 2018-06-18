import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions'
import { GET_ALL_PRODUCTS } from './constants'
import request from 'utils/request'


const url = 'http://13.209.25.111:8000/products/?ordering=-rating_avg'

export function* getAllProducts(id) {
  try {
    const data = yield call(request, url+'&page='+id)
    yield put(actions.productsListReceived(data))
  }
  catch (error) {
    yield put(actions.productsListReceived())
  }
}

// Individual exports for testing
export function* defaultSaga() {
  while (true) {
    const {id} = yield take(GET_ALL_PRODUCTS)
    yield call(getAllProducts, id)
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
