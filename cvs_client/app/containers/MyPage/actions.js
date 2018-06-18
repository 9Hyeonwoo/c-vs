/*
 *
 * MyPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_COMMENTS_REVIEWS_RECIPES,
  COMMENTS_REVIEWS_RECIPES_RECEIVED,
  REQUEST_RECIPE_DETAIL,
  RECEIVED_RECIPE_DETAIL
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getCommentsReviewsRecipes(commentSet, reviewSet, recipeSet) {
  return {
    type: GET_COMMENTS_REVIEWS_RECIPES,
    commentSet,
    reviewSet,
    recipeSet
  }
}

export function commentsRecipesReviewsReceived(commentsList, reviewsList, recipesList) {
  return {
    type: COMMENTS_REVIEWS_RECIPES_RECEIVED,
    commentsList: commentsList,
    reviewsList: reviewsList,
    recipesList: recipesList
  }
}

export function requestRecipeDetail(id){
  return{
    type: REQUEST_RECIPE_DETAIL,
    id
  }
}

export function receivedRecipeDetail(recipeDetail){
  return{
    type: RECEIVED_RECIPE_DETAIL,
    recipeDetail: recipeDetail
  }
}

