/*
 *
 * RecipeAll reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, RECIPES_LIST_RECEIVED,
} from './constants';

const initialState = fromJS({});

function recipeAllReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECIPES_LIST_RECEIVED:
      return fromJS({...state, recipesList: action.recipesList})
    default:
      return state;
  }
}

export default recipeAllReducer;
