export default (injected) => () => (next) => (action) => {
  const { type, meta } = action;

  if (!meta || !meta.inject || typeof action.payload !== 'function') {
    return next(action);
  }

  next({ type: `${type}_REQUEST`, meta });

  return Promise.resolve(action.payload(injected)).then(
    ({ data }) => next({ ...action, payload: data }),
    (payload) => next({ ...action, error: true, payload })
  );
};

export const injected = (type, payload, meta = {}) => ({
  type,
  payload,
  meta: { ...meta, inject: true },
});

const createRequestLiteral = (type, config, meta) => (
  injected({
    type,
    payload: ({ client }) => client(config),
    meta,
  })
);

export const nonBodyMethods = new Set(['GET', 'DELETE', 'HEAD', 'OPTIONS']);

export const createRequest = new Proxy(createRequestLiteral, {
  get(target, name) {
    const resolvedName = name.toUpperCase();

    if (nonBodyMethods.has(resolvedName)) {
      return (type, url, meta) =>
        target(type, { url, method: resolvedName }, meta);
    }

    return (type, url, data, meta) =>
      target(type, { url, method: resolvedName, data }, meta);
  },
});
