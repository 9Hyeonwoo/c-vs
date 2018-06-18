/*
 *
 * MainPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_POPULAR_PRODUCTS,
  POPULAR_LIST_RECEIVED
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getPopularProduct() {
  return{
    type: GET_POPULAR_PRODUCTS,
  };
  
}

export function popularListReceived(popularList) {
  return{
    type: POPULAR_LIST_RECEIVED,
    popularList: popularList
  }
}