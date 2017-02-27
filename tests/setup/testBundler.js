import 'babel-polyfill';
import { isFSA } from 'flux-standard-action';

import 'jest-enzyme';
import './testGlobals';
import './renderRoute';

// our own custom matchers
const matchers = {
  toBeAnFSA() {
    return {
      compare(actual) {
        return {
          pass: isFSA(actual),
          message: `Expected ${JSON.stringify(actual)} to be an FSA`,
        };
      },
    };
  },
  toHaveType() {
    return {
      compare(actual, expected) {
        return {
          pass: actual.type === expected,
          message: `Expected ${JSON.stringify(actual.type)} to be ${expected}`,
        };
      },
    };
  },
  toHaveChild() {
    return {
      compare(actual, expected) {
        return {
          pass: actual.find(expected).length > 0,
          message: `Expected actual to have child ${expected}`,
        };
      },
    };
  },
};

/* eslint-disable no-undef */

jasmine.getEnv().beforeEach(() => {
  jasmine.addMatchers(matchers);
});
