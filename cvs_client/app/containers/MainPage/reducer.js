/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  POPULAR_LIST_RECEIVED
} from './constants';

const initialState = fromJS({});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case POPULAR_LIST_RECEIVED:
      return fromJS({...state.toJS(), popularList: action.popularList});
    default:
      return state;
  }
}

export default mainPageReducer;
