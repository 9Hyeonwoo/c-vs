import { take, call, put, select, fork } from 'redux-saga/effects';
import * as actions from './actions'
import {
  REQUEST_PRODUCT_DETAIL, REQUEST_RELATED_PRODUCTS, POST_REQUEST_COMMENT, GET_REQUEST_COMMENT,
  GET_REQUEST_REVIEWS, GET_POPULAR_PRODUCTS
} from './constants'
import request from 'utils/request'

const url = 'http://13.209.25.111:8000/products/'
const commentURL = 'http://13.209.25.111:8000/comments/'
const reviewsURL = 'http://13.209.25.111:8000/reviews/'

export const getUserInfo = (state) => state.get('global').toJS().loginResult;

export function* requestProductDetail(id) {
  try {
    const data = yield call(request, url + id)
    yield put(actions.receivedProductDetail(data))
  }
  catch (error) {
    yield put(actions.receivedProductDetail())
  }
}

export function* requestRelatedProducts(smallCategory, largeCategory) {
  try {
    const data = yield call(request, url + '?' + (smallCategory ? 'small_category=' + smallCategory :'') + (largeCategory ? '&large_category=' + largeCategory :''))
    yield put(actions.receivedRelatedProducts(data))
  }
  catch (error) {
    yield put(actions.receivedRelatedProducts())
  }
}

export function* postRequestComment(content, product, rating) {
  const userInfo = yield select(getUserInfo)
  try {
    const data = yield call(request, commentURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + userInfo.token
      },
      body: JSON.stringify({
        content: content,
        product: product,
        rating: rating
      })
    })
    const result = yield call(request, commentURL + '?product=' + product)
    yield put(actions.receivedComments(result))
  }
  catch(error) {
  }
}

export function* getRequestComment(id) {
  try {
    const data = yield call(request, commentURL + '?product=' + id)
    yield put(actions.receivedComments(data))
  }
  catch (error) {
    yield put(actions.receivedComments())
  }
}

export function* getRequestReviews(id) {
  try {
    const data = yield call(request, reviewsURL + '?product=' + id)
    yield put(actions.receivedReviews(data))
  }
  catch (error) {
    yield put(actions.receivedReviews())
  }
}

export function* watchRequestProductDetail() {
  while (true) {
    const { id } = yield take(REQUEST_PRODUCT_DETAIL)
    yield call(requestProductDetail, id)
  }
}

export function* watchRequestRelatedProducts() {
  while (true) {
    const { smallCategory, largeCategory } = yield take(REQUEST_RELATED_PRODUCTS)
    yield call(requestRelatedProducts, smallCategory, largeCategory)
  }
}

export function* watchPostRequestComment() {
  while (true) {
    const { content, product, rating } = yield take(POST_REQUEST_COMMENT)
    yield call(postRequestComment, content, product, rating)
  }
}

export function* watchGetRequestComment() {
  while (true) {
    const { id } = yield take(GET_REQUEST_COMMENT)
    yield call(getRequestComment, id)
  }
}

export function* watchGetRequestReviews() {
  while (true) {
    const { id } = yield take(GET_REQUEST_REVIEWS)
    yield call(getRequestReviews, id)
  }
}


export function* getPopularProducts() {
  try {
    const data = yield call(request, url+'?ordering=-rating_avg')
    yield put(actions.popularListReceived(data))
  }
  catch (error) {
    yield put(actions.popularListReceived())
  }
}


export function* watchGetPopularProducts() {
  while (true) {
    const {} = yield take(GET_POPULAR_PRODUCTS)
    yield call(getPopularProducts)
  }
}

export function* defaultSaga() {
  yield fork(watchRequestProductDetail)
  yield fork(watchRequestRelatedProducts)
  yield fork(watchPostRequestComment)
  yield fork(watchGetRequestComment)
  yield fork(watchGetRequestReviews)
  yield fork(watchGetPopularProducts)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
