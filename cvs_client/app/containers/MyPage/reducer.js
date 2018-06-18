/*
 *
 * MyPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  COMMENTS_REVIEWS_RECIPES_RECEIVED, REVIEWS_RECEIVED, RECIPES_RECEIVED, RECEIVED_RECIPE_DETAIL
} from './constants';

const initialState = fromJS({});

function myPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case COMMENTS_REVIEWS_RECIPES_RECEIVED:
      return fromJS({...state.toJS(), commentsList: action.commentsList, reviewsList: action.reviewsList, recipesList: action.recipesList})
    case RECEIVED_RECIPE_DETAIL:
      return fromJS({...state.toJS(), recipeDetail: action.recipeDetail})
    default:
      return state;
  }
}

export default myPageReducer;
