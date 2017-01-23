import { transformResponse, transformRequest } from 'helpers/apiClient';

describe('Api Configuration', () => {
  const testApiBaseUrl = 'testApiBaseUrl';
  const testRequestConfig = { headers: { header: 'HEADER' } };

  describe('transformRequest', () => {
    let config;
    let expected;
    let url;
    let transformed;
    const underTest = transformRequest(testApiBaseUrl, testRequestConfig);

    describe('when config.url does not begin with "/"', () => {
      beforeEach(() => {
        url = Math.random().toString(36).substr(7);
        config = { url };
        expected = { ...config };
        transformed = underTest(config);
      });

      it('should not transform the response', () => {
        expect(transformed).to.deep.equal(expected);
      });

      it('should not return a new object', () => {
        expect(transformed).to.equal(config);
      });
    });

    describe('when config.url begins with "/"', () => {
      beforeEach(() => {
        url = '/url';
        config = { url, headers: { originalHeader: 'originalHeader' } };
        transformed = underTest(config);
      });

      it('should add prepend the configured base url', () => {
        expect(transformed.url).to.equal(testApiBaseUrl + url);
      });

      it('should concat injected headers with request headers', () => {
        expect(transformed.headers).to.deep.equal({
          ...config.headers,
          ...testRequestConfig.headers,
        });
      });

      it('should not mutate config', () => {
        expect(transformed).to.not.equal(config);
      });
    });
  });

  describe('transform Response', () => {
    it('should pull off data', () => {
      const data = Math.random();
      expect(transformResponse({ data })).to.equal(data);
    });
  });
});
