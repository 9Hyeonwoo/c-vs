import { take, call, put, select } from 'redux-saga/effects';
import request from 'utils/request'
import * as actions from './actions'
import { SEND_REQUEST_POST } from './constants'

const reviewURL = 'http://13.209.25.111:8000/reviews/'
const postURL = 'http://13.209.25.111:8000/posts/'
export const getUserInfo = (state) => state.get('global').toJS().loginResult;

export function* sendRequestPost (review, posts) {
  const userInfo = yield select(getUserInfo)
  try {
    const reviewData = yield call(request, reviewURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + userInfo.token
      },
      body: JSON.stringify(review)
    })
    for(let i=0; i<posts.length; i++) {
      const form = new FormData()
      form.set('review_id', reviewData.id)
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

export function* watchSendRequestPost() {
  while (true) {
    const { review, posts } = yield take(SEND_REQUEST_POST)
    yield call(sendRequestPost, review, posts)
  }
}

// All sagas to be loaded
export default [
  watchSendRequestPost,
];
