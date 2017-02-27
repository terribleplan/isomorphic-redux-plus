import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import handleRequests from 'helpers/api/handleRequests';

describe('handleRequests', () => {
  let prefix;
  let req;
  let client;
  let mock;

  beforeEach(() => {
    prefix = createRandomString('prefix');
    req = createRandom(({ string }) => ({
      headers: {
        header: string,
      },
    }));
    client = handleRequests(axios.create(), prefix, req);
    mock = new MockAdapter(client);
    mock.onGet(/.*/).reply((conf) => ([200, conf]));
  });

  afterEach(() => {
    mock.restore();
  });

  describe('when a url not begining with "/" is called', () => {
    const endpoint = Math.random().toString(36).substr(7);
    let headers;
    let url;

    beforeEach(() => client.get(endpoint).then((res) => {
      headers = res.data.headers;
      url = res.data.url;
    }));

    it('should pass the unaltered url through', () => {
      expect(url).toEqual(endpoint);
    });

    it('should not modify request headers', () => {
      expect(headers.header).toBeUndefined();
    });
  });

  describe('when a url begining with "/about" is called', () => {
    const endpoint = '/about';
    let headers;
    let url;

    beforeEach(() => client.get(endpoint).then((res) => {
      headers = res.data.headers;
      url = res.data.url;
    }));


    it('should prepend the configured base url', () => {
      expect(url).toEqual(prefix + endpoint);
    });

    it('should attach the configured headers to the request', () => {
      expect(headers).toEqual(expect.objectContaining(req.headers));
    });
  });
});
