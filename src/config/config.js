function apiPath() {
  switch (process.env.NODE_ENV) {
    case 'development': return 'http://localhost:3001';
    case 'staging':     return 'http://api-staging.scroogevault.co';
    case 'production':  return 'http://api.scroogevault.co';
    default:            return 'http://localhost:3001';
  }
}

function clientPath() {
  switch (process.env.NODE_ENV) {
    case 'development': return 'http://localhost:3000';
    case 'staging':     return 'http://staging.scroogevault.co';
    case 'production':  return 'http://scroogevault.co';
    default:            return 'http://localhost:3000';
  }
}

export { apiPath, clientPath };
