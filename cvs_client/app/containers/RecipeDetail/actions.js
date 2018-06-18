/*
 *
 * RecipeDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_RECIPE_DETAIL,
  RECEIVED_RECIPE_DETAIL
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
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