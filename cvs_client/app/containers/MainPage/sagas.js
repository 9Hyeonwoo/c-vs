import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions'
import { GET_POPULAR_PRODUCTS } from './constants'
import request from 'utils/request'
// Individual exports for testing

const url = 'http://13.209.25.111:8000/products/'

export function* getPopularProducts() {

  console.log("GET POPULAR PRODUCT saga");
  try {
    const data = yield call(request, url+'?ordering=-rating_avg')
    yield put(actions.popularListReceived(data))
  }
  catch (error) {
    yield put(actions.popularListReceived())
  }
}


export function* defaultSaga() {
  while (true) {
    const {} = yield take(GET_POPULAR_PRODUCTS)
    yield call(getPopularProducts)
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
