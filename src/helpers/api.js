import request from 'superagent';
import { apiPath } from '../config/config';

function handleResponse(err, res, config) {
  if (err || !res.ok) {
    config.onError(err);
  } else {
    config.onSuccess(res.body);
  }
}

export function getIndex(config) {
  request
    .get(`${apiPath()}/api/${config.endpointPath}`)
    .set('Accept', 'application/json')
    .end((err, res) => handleResponse(err, res, config));
}

export function postCreate(config) {
  request
    .post(`${apiPath()}/api/${config.endpointPath}`)
    .set('Accept', 'application/json')
    .send(config.data)
    .end((err, res) => handleResponse(err, res, config));
}

export function putUpdate(config) {
  request
    .put(`${apiPath()}/api/${config.endpointPath}`)
    .set('Accept', 'application/json')
    .send(config.data)
    .end((err, res) => handleResponse(err, res, config));
}

export function deleteEntity(config) {
  request
    .delete(`${apiPath()}/api/${config.endpointPath}`)
    .set('Accept', 'application/json')
    .end((err, res) => handleResponse(err, res, config));
}
