const ClientError = require('./ClientError');

class AuthorizationError extends ClientError {
  constructor(message = 'Access denied') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
