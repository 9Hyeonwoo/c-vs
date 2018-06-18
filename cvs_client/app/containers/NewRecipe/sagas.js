import { take, call, put, select, fork } from 'redux-saga/effects';
import * as actions from './actions'
import { REQUEST_PRODUCT_LIST, SEND_REQUEST_POST } from './constants'
import request from 'utils/request'

const url = 'http://13.209.25.111:8000/products/'
const recipeURL = 'http://13.209.25.111:8000/recipes/'
const postURL = 'http://13.209.25.111:8000/posts/'


export const getUserInfo = (state) => state.get('global').toJS().loginResult;

export function* requestProductList(searchText) {
  if(searchText === '') {
    yield put(actions.receivedProductList())
    return
  }
  try {
    const data = yield call(request, url + '?search=' + searchText)
    yield put(actions.receivedProductList(data))
  }
  catch (error) {
    yield put(actions.receivedProductList())
  }
}

export function* sendRequestPost (recipe, posts) {
  const userInfo = yield select(getUserInfo)
  try {
    const recipeData = yield call(request, recipeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + userInfo.token
      },
      body: JSON.stringify(recipe)
    })
    for(let i=0; i<posts.length; i++) {
      const form = new FormData()
      form.set('recipe_id', recipeData.id)
      form.set('content', posts[i].content)
      if(posts[i].image)
        form.set('image', posts[i].image)
      try {
        const postData = yield call(request, postURL, {
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + userInfo.token
          },
          body: form
        })
      } catch (postError) {
        yield put(actions.isSuccessfulPost(false))
      }
    }
    yield put(actions.isSuccessfulPost(true))
  } catch (recipeError) {
    yield put(actions.isSuccessfulPost(false))
  }
}

export function* watchRequestProductList() {
  while (true) {
    const { searchText } = yield take(REQUEST_PRODUCT_LIST)
    yield call(requestProductList, searchText)
  }
}

export function* watchSendRequestPost() {
  while (true) {
    const { recipe, posts } = yield take(SEND_REQUEST_POST)
    yield call(sendRequestPost, recipe, posts)
  }
}

// All sagas to be loaded
export default [
  watchRequestProductList,
  watchSendRequestPost
];
