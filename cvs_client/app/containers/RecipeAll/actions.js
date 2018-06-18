/*
 *
 * RecipeAll actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_RECIPES,
  RECIPES_LIST_RECEIVED,
  REQUEST_RECIPE_DETAIL,
  RECEIVED_RECIPE_DETAIL
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllRecipes(){
  return{
    type: GET_ALL_RECIPES
  }
}

export function recipeListReceived(recipesList){
  return{
    type: RECIPES_LIST_RECEIVED,
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
