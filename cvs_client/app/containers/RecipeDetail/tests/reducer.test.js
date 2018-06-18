
import { fromJS } from 'immutable';
import recipeDetailReducer from '../reducer';

describe('recipeDetailReducer', () => {
  it('returns the initial state', () => {
    expect(recipeDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
