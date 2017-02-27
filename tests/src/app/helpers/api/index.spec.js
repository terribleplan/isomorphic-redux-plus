import createApiClient from 'helpers/api';
import * as axios from 'axios';

describe('createApi', () => {
  beforeEach(() => {
    axios.default.create = jest.fn().mockReturnValue('axios');
  });

  it('create a fresh axios instance', () => {
    try {
      createApiClient('prefix', 'req');
    } catch (e) {} // eslint-disable-line no-empty

    expect(axios.default.create).toBeCalled();
  });
});
