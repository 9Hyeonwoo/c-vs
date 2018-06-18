/*
 *
 * RecipeAll actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_RECIPES,
  RECIPES_LIST_RECEIVED
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
