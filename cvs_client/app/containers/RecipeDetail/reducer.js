/*
 *
 * RecipeDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, RECEIVED_RECIPE_DETAIL,
} from './constants';

const initialState = fromJS({});

function recipeDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECEIVED_RECIPE_DETAIL:
      return fromJS({...state.toJS(), recipeDetail: action.recipeDetail})
    default:
      return state;
  }
}

export default recipeDetailReducer;
