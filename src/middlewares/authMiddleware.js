const AuthenticationError = require('../utils/AuthenticationError');
const TokenManager = require('../utils/TokenManager');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const decoded = TokenManager.verifyAccessToken(token);

    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return next(error);
    }
    return next(new AuthenticationError('Access token is not valid'));
  }
};

module.exports = authMiddleware;
