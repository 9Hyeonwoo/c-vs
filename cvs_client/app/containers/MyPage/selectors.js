import { createSelector } from 'reselect';

/**
 * Direct selector to the myPage state domain
 */
const selectMyPageDomain = () => (state) => state.get('myPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MyPage
 */

const makeSelectMyPage = () => createSelector(
  selectMyPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMyPage;
export {
  selectMyPageDomain,
};
