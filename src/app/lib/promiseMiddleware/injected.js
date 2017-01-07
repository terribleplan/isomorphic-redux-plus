const injected = (type, payload, meta = {}) => ({
  type,
  payload,
  meta: { ...meta, inject: true },
});

export default injected;
