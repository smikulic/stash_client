const apiPaths = [
  'http://localhost:3001',
  'http://api.scroogevault.co',
];

const clientPaths = [
  'http://localhost:3000',
  'http://www.scroogevault.co',
];

function switchPaths(paths) {
  switch (process.env.NODE_ENV) {
    case 'development': return paths[0];
    case 'production':  return paths[1];
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
