// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions'
import { GET_ALL_RECIPES, REQUEST_RECIPE_DETAIL } from './constants'
import request from 'utils/request'


const url = 'http://13.209.25.111:8000/recipes/'

export function* getAllRecipes(){
  try{
    const data = yield call(request, url+'?page=1/')
    yield put(actions.recipeListReceived(data))
  }
  catch(error){
    yield put(actions.recipeListReceived())
  }
}

export function* requestRecipeDetail(id){
  try {
    const data = yield call(request, url + id + '/')
    yield put(actions.receivedRecipeDetail(data))
  }
  catch (error) {
    yield put(actions.receivedRecipeDetail())
  }
}

// Individual exports for testing
export function* watchGetAllRecipes() {
  while(true){
    const {} = yield take(GET_ALL_RECIPES)
    yield call(getAllRecipes)
  }
}

export function* watchRequestRecipeDetail() {
  while(true){
    const { id } = yield take(REQUEST_RECIPE_DETAIL)
    yield call(requestRecipeDetail, id)
  }
}


// All sagas to be loaded
export default [
  watchGetAllRecipes,
  watchRequestRecipeDetail
];
