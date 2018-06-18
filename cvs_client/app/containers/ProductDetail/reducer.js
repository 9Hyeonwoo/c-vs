/*
 *
 * ProductDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  RECEIVED_PRODUCT_DETAIL,
  RECEIVED_RELATED_PRODUCTS,
  RECEIVED_COMMENTS, RECEIVED_REVIEWS,
  POPULAR_LIST_RECEIVED
} from './constants';

const initialState = fromJS({});

function productDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECEIVED_PRODUCT_DETAIL:
      return fromJS({...state.toJS(), productDetail: action.productDetail});
    case RECEIVED_RELATED_PRODUCTS:
      return fromJS({...state.toJS(), relatedProducts: action.relatedProducts});
    case RECEIVED_COMMENTS:
      return fromJS({...state.toJS(), commentList: action.commentList});
    case RECEIVED_REVIEWS:
      return fromJS({...state.toJS(), reviewsList: action.reviewsList});
    case POPULAR_LIST_RECEIVED:
      return fromJS({...state.toJS(), popularList: action.popularList});
    default:
      return state;
  }
}

export default productDetailReducer;
