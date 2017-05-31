const apiPaths = [
  'http://localhost:3001',
  'http://api-staging.scroogevault.co',
  'http://api.scroogevault.co',
];

const clientPaths = [
  'http://localhost:3000',
  'http://staging.scroogevault.co',
  'http://scroogevault.co',
];

function switchPaths(paths) {
  switch (process.env.NODE_ENV) {
    case 'development': return paths[0];
    case 'staging':     return paths[1];
    case 'production':  return paths[2];
    default:            return paths[0];
  }
}

function apiPath() {
  return switchPaths(apiPaths);
}

function clientPath() {
  return switchPaths(clientPaths);
}

export { apiPath, clientPath };
