import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions'
import {REQUEST_RECIPE_DETAIL, RECEIVED_RECIPE_DETAIL} from './constants'
import request from 'utils/request'

const url = 'http://13.209.25.111:8000/recipes/'

export function* requestRecipeDetail(id){
  try {
    const data = yield call(request, url + id)
    yield put(actions.receivedRecipeDetail(data))
  }
  catch (error) {
    yield put(actions.receivedRecipeDetail())
  }
}

export function* defaultSaga() {
  while(true){
    const { id } = yield take(REQUEST_RECIPE_DETAIL)
    yield call(requestRecipeDetail, id)
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
