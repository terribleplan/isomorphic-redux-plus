import promiseMiddleware from 'lib/promiseMiddleware';
import { createRequest } from 'lib/promiseMiddleware';

describe('promiseMiddleware', () => {
  let next;
  beforeEach(() => {
    next = sinon.stub();
  });

  it('returns a function when called', () => {
    const actual = promiseMiddleware();

    expect(actual).to.be.a('function');
  });

  it('returns a function when called twice', () => {
    const actual = promiseMiddleware()();

    expect(actual).to.be.a('function');
  });

  it('returns a function when called three times', () => {
    const actual = promiseMiddleware()()();

    expect(actual).to.be.a('function');
  });

  it('passes actions through when there is no `promise` key on the action', () => {
    const underTest = promiseMiddleware()()(next);

    const input = Math.random();
    const expected = input;

    // This is an invariant that should never be violated by Math.random/Number
    expect(input).not.to.have.key('promise');

    underTest(input);

    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWithExactly(expected);
  });

  describe('when meta.injected is true and payload is a function', () => {
    it('fires the _REQUEST action immediately instead of the action proper', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const payload = () => Promise.resolve();
      const meta = { inject: true };

      const input = { type, payload, meta };

      const expected = { type: `${type}_REQUEST`, meta };

      // Ignore exceptions, all we care about is _REQUEST being fired
      try {
        underTest(input);
      } catch (e) {} // eslint-disable-line no-empty

      expect(next).to.have.been.calledOnce;
      expect(next).not.to.have.been.calledWithExactly(input);
      expect(next).to.have.been.calledWithExactly(expected);
    });

    it('fires the action when the promise resolves', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const data = Math.random();
      const payload = () => Promise.resolve({ data });
      const meta = { inject: true };

      const input = { type, payload, meta };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ ...input, payload: data });
      });
    });

    it('forwards all meta data', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const data = Math.random();
      const payload = () => Promise.resolve({ data });
      const meta = { inject: true, foo: Math.random(), bar: Math.random };

      const input = { type, payload, meta };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ ...input, payload: data });
      });
    });

    it('fires the action with `error: true` when a promise rejects', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const err = Math.random();
      const payload = () => Promise.reject(err);
      const meta = { inject: true };

      const input = { type, payload, meta };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ ...input, payload: err, error: true });
      });
    });
  });
});


describe('createRequest', () => {
  it('properly formats into an FSA that the promiseMiddleware will intercept', () => {
    const type = Math.random();
    const config = Math.random();
    const meta = { foo: Math.random() };

    const action = createRequest(type, config, meta);

    const expected = {
      type,
      meta: { foo: meta.foo, inject: true },
    };

    expect(action.type).to.equal(expected.type);
    expect(action.meta).to.deep.equal(expected.meta);
  });

  it('should not mutate meta', () => {
    const meta = { foo: Math.random() };
    const action = createRequest(Math.random(), Math.random(), meta);

    expect(action.meta).not.to.equal(meta);
  });

  it('calling payload should call client with the config object', () => {
    const config = Math.random();
    const action = createRequest(Math.random(), config, {});
    const injected = { client: sinon.spy() };

    action.payload(injected);

    expect(injected.client).to.have.been.calledWithExactly(config);
  });

  it('calling payload should return the output of client', () => {
    const action = createRequest(Math.random(), Math.random(), {});
    const clientOutput = Math.random();
    const injected = { client: sinon.stub().returns(clientOutput) };

    const output = action.payload(injected);

    expect(output).to.equal(clientOutput);
  });

  it('should be made sure that these tests fail', () => expect(true).to.equal(false));

  describe('the proxy methods', () => {
    it('should be tested', () => expect(true).to.equal(false));
  });
});
