const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
};

module.exports = config;
