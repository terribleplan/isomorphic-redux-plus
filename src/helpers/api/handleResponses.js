export default function handleResponses(client) {
  client.interceptors.response.use(
    ({ data }) => data,
    ({ response }) => Promise.reject(response)
  );

  return client;
}
