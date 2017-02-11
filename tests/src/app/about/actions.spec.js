import { loadAbout, toggleKitten } from 'about/actions';
import { TOGGLE_KITTEN, LOAD_ABOUT } from 'about/types';
import { setStatus } from 'status/actions';

describe('about actions', () => {
  let action;

  describe('loadAbout', () => {
    beforeEach(() => {
      action = loadAbout();
    });

    it('should return a function', () => {
      expect(typeof action).toEqual('function');
    });

    describe('returned function', () => {
      let client;
      let store;

      beforeEach(() => {
        client = { get: jest.fn(() => Promise.resolve()) };
        store = { dispatch: jest.fn() };
        action = loadAbout()({ client, store });
      });

      it('should create an FSA', () => {
        expect(action).toBeAnFSA();
      });

      it(`should have type: ${LOAD_ABOUT}`, () => {
        expect(action).toHaveType(LOAD_ABOUT);
      });

      it('should get about data', () => {
        expect(client.get).toBeCalledWith('/about');
      });

      describe('on error', () => {
        const status = Math.random();

        beforeEach(() => {
          const err = { response: { status } };
          client = { get: jest.fn(() => Promise.reject(err)) };
          action = loadAbout()({ client, store });
        });

        it('should set status', () => action.payload.then(() => {
          expect(store.dispatch).toBeCalledWith(setStatus(status));
        }));
      });
    });
  });

  describe('toggleKitten', () => {
    beforeEach(() => {
      action = toggleKitten();
    });

    it('should create an FSA', () => {
      expect(action).toBeAnFSA();
    });

    it(`should have type: ${TOGGLE_KITTEN}`, () => {
      expect(action).toHaveType(TOGGLE_KITTEN);
    });
  });
});
