export default function handleRequests(client, prefix, req) {
  client.interceptors.request.use((config) => {
    if (config.url[0] !== '/') {
      return config;
    }

    const headers = { ...(req.headers || {}), ...config.headers } || config.headers;
    const url = prefix + config.url;

    return { ...config, headers, url };
  });

  return client;
}
