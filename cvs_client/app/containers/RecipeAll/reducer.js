/*
 *
 * RecipeAll reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, RECIPES_LIST_RECEIVED, RECEIVED_RECIPE_DETAIL
} from './constants';

const initialState = fromJS({});

function recipeAllReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECIPES_LIST_RECEIVED:
      return fromJS({...state, recipesList: action.recipesList})
    case RECEIVED_RECIPE_DETAIL:
      return fromJS({...state.toJS(), recipeDetail: action.recipeDetail})
    default:
      return state;
  }
}

export default recipeAllReducer;
