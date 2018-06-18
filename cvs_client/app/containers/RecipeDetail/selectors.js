import { createSelector } from 'reselect';

/**
 * Direct selector to the recipeDetail state domain
 */
const selectRecipeDetailDomain = () => (state) => state.get('recipeDetail');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RecipeDetail
 */

const makeSelectRecipeDetail = () => createSelector(
  selectRecipeDetailDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRecipeDetail;
export {
  selectRecipeDetailDomain,
};
