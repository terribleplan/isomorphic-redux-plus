import injected from './injected';

const createRequest = (type, config, meta) => (
  injected({
    type,
    payload: ({ client }) => client(config),
    meta,
  })
);

const nonBodyMethods = new Set(['GET', 'DELETE', 'HEAD', 'OPTIONS']);

export default new Proxy(createRequest, {
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
