import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import handleResponses from 'helpers/api/handleResponses';

describe('handleResponses', () => {
  let client;
  let mock;
  const data = Math.random();

  beforeEach(() => {
    client = handleResponses(axios.create());
    mock = new MockAdapter(client);
    mock.onGet('success').reply(() => ([200, data]));
    mock.onGet('fail').reply(() => ([500, data]));
  });

  afterEach(() => {
    mock.restore();
  });

  it('pulls data key off successful responses', () =>
    client.get('success').then((res) => {
      expect(res).toEqual(data);
    }));

  it('pulls response key off errors', () => {
    expect.assertions(1);
    const expected = expect.objectContaining({ status: 500, data });
    return client.get('fail').catch((err) => {
      expect(err).toEqual(expected);
    });
  });
});
