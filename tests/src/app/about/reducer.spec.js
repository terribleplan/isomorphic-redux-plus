import reducer, { defaultState } from 'about/reducer';

import { createAction } from 'redux-actions';
import { loadAboutAction, toggleKitten } from 'about/actions';
import { fromJS } from 'immutable';

const randomAction = createAction(Math.random());

describe('about reducer', () => {
  // invariant
  it('returns unmodified state when action is unhandled', () => {
    const prev = Math.random();
    const next = reducer(prev, randomAction());
    expect(next).toBe(prev);
  });

  // invariant
  it('uses default state when no state is passed', () => {
    expect(reducer(undefined, randomAction())).toBe(defaultState);
  });

  describe('LOAD_ABOUT', () => {
    it('sets text from payload', () => {
      const text = Math.random();
      const prev = fromJS({ text: null });
      const next = reducer(prev, loadAboutAction({ text }));
      expect(next.get('text')).toEqual(text);
    });
  });

  describe('TOGGLE_KITTEN', () => {
    describe('when showKitten is true', () => {
      it('flips to false', () => {
        const prev = fromJS({ showKitten: true });
        const next = reducer(prev, toggleKitten());
        expect(next.get('showKitten')).toEqual(false);
      });
    });

    describe('when showKitten is false', () => {
      it('flips to true', () => {
        const prev = fromJS({ showKitten: false });
        const next = reducer(prev, toggleKitten());
        expect(next.get('showKitten')).toEqual(true);
      });
    });
  });
});
