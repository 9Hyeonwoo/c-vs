/*
 *
 * ProductDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_PRODUCT_DETAIL,
  RECEIVED_PRODUCT_DETAIL,
  REQUEST_RELATED_PRODUCTS,
  RECEIVED_RELATED_PRODUCTS,
  POST_REQUEST_COMMENT,
  GET_REQUEST_COMMENT,
  RECEIVED_COMMENTS,
  GET_REQUEST_REVIEWS,
  GET_POPULAR_PRODUCTS,
  POPULAR_LIST_RECEIVED,
  RECEIVED_REVIEWS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestProductDetail (id) {
  return {
    type: REQUEST_PRODUCT_DETAIL,
    id
  }
}

export function receivedProductDetail (productDetail) {
  return {
    type: RECEIVED_PRODUCT_DETAIL,
    productDetail: productDetail
  }
}

export function requestRelatedProducts (smallCategory, largeCategory) {
  return {
    type: REQUEST_RELATED_PRODUCTS,
    smallCategory,
    largeCategory
  }
}

export function receivedRelatedProducts (relatedProducts) {
  return {
    type: RECEIVED_RELATED_PRODUCTS,
    relatedProducts: relatedProducts
  }
}

export function postRequestComment (content, product, rating) {
  return {
    type: POST_REQUEST_COMMENT,
    content,
    product,
    rating
  }
}

export function getRequestComment (id) {
  return {
    type: GET_REQUEST_COMMENT,
    id,
  }
}

export function receivedComments (commentList) {
  return {
    type: RECEIVED_COMMENTS,
    commentList: commentList
  }
}

export function getRequestReviews (id) {
  return {
    type: GET_REQUEST_REVIEWS,
    id,
  }
}

export function receivedReviews (reviewsList) {
  return {
    type: RECEIVED_REVIEWS,
    reviewsList: reviewsList
  }
}

export function getPopularProduct() {
  return{
    type: GET_POPULAR_PRODUCTS,
  };

}

export function popularListReceived(popularList) {
  return {
    type: POPULAR_LIST_RECEIVED,
    popularList: popularList
  }
}
