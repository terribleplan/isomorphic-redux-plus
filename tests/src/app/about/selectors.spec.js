import { getAbout, getShowKitten } from 'about/selectors';
import { fromJS } from 'immutable';

const text = Math.random();
const showKitten = Math.random();
const state = fromJS({ about: { text, showKitten } });

describe('about selectors', () => {
  describe('getAbout', () => {
    it('gets about text from state', () => {
      expect(getAbout(state)).toEqual(text);
    });
  });
  describe('getShowKitten', () => {
    it('gets showKitten from state', () => {
      expect(getShowKitten(state)).toEqual(showKitten);
    });
  });
});
