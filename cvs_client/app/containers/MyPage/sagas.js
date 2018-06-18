import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './actions'
import {GET_COMMENTS_REVIEWS_RECIPES, REQUEST_RECIPE_DETAIL} from './constants'
import request from 'utils/request'

const commentURL = 'http://13.209.25.111:8000/comments/'
const reviewURL = 'http://13.209.25.111:8000/reviews/'
const recipeURL = 'http://13.209.25.111:8000/recipes/'

export function* getCommentsReviewsRecipes(commentSet, reviewSet, recipeSet) {
  try {
    let commentsList = []
    let reviewsList = []
    let recipesList = []
    for(let i=0; i<commentSet.length; i++) {
      const data = yield call(request, commentURL+commentSet[i] + '/')
      commentsList.push(data)
    }
    for(let i=0; i<reviewSet.length; i++) {
      const data = yield call(request, reviewURL+reviewSet[i] + '/')
      reviewsList.push(data)
    }
    for(let i=0; i<recipeSet.length; i++) {
      const data = yield call(request, recipeURL+recipeSet[i] + '/')
      recipesList.push(data)
    }
    yield put(actions.commentsRecipesReviewsReceived(commentsList, reviewsList, recipesList))
  }
  catch (error) {
    yield put(actions.commentsRecipesReviewsReceived())
  }
}


export function* requestRecipeDetail(id){
  try {
    const data = yield call(request, recipeURL + id + '/')
    yield put(actions.receivedRecipeDetail(data))
  }
  catch (error) {
    yield put(actions.receivedRecipeDetail())
  }
}

export function* watchRequestRecipeDetail() {
  while(true){
    const { id } = yield take(REQUEST_RECIPE_DETAIL)
    yield call(requestRecipeDetail, id)
  }
}

// Individual exports for testing
export function* watchGetCommentsReviewsRecipes() {
  while (true) {
    const {commentSet, reviewSet, recipeSet} = yield take(GET_COMMENTS_REVIEWS_RECIPES)
    yield call(getCommentsReviewsRecipes, commentSet, reviewSet, recipeSet)
  }
}


// All sagas to be loaded
export default [
  watchGetCommentsReviewsRecipes,
  watchRequestRecipeDetail
];
