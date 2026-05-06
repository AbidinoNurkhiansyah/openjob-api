const jwt = require('jsonwebtoken');
const config = require('../config');
const InvariantError = require('./InvariantError');

const TokenManager = {
  generateAccessToken(payload) {
    return jwt.sign(payload, config.accessTokenKey, { expiresIn: '3h' });
  },

  generateRefreshToken(payload) {
    return jwt.sign(payload, config.refreshTokenKey);
  },

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, config.refreshTokenKey);
    } catch (error) {
      throw new InvariantError('Refresh token is not valid');
    }
  },

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, config.accessTokenKey);
    } catch (error) {
      throw new InvariantError('Access token is not valid');
    }
  },
};

module.exports = TokenManager;
