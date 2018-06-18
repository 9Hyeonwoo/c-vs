// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions'
import { GET_ALL_RECIPES } from './constants'
import request from 'utils/request'


const url = 'http://13.209.25.111:8000/recipes/'

export function* getAllRecipes(){
  try{
    const data = yield call(request, url+'?page=1')
    yield put(actions.recipeListReceived(data))
  }
  catch(error){
    yield put(actions.recipeListReceived())
  }
}

// Individual exports for testing
export function* defaultSaga() {
  while(true){
    const {} = yield take(GET_ALL_RECIPES)
    yield call(getAllRecipes)
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
