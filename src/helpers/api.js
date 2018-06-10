import request from 'superagent';
import { apiPath } from '../config/config';

function handleResponse(err, res, config) {
  if (err || !res.ok) {
    config.onError ? config.onError(err) : console.warn(err);
  } else {
    config.onSuccess(res.body);
  }
}

export function handleRequest(config) {
  request(config.method, `${apiPath()}/api/${config.endpointPath}`)
    .set('Accept', 'application/json')
    .send(config.data || undefined)
    .end((err, res) => handleResponse(err, res, config));
}
