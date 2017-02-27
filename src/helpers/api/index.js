import axios from 'axios';

import handleRequests from './handleRequests';
import handleResponses from './handleResponses';

export default function createApiClient(prefix, req = {}) {
  return handleResponses(handleRequests(axios.create(), prefix, req));
}
