const authenticationService = require('../services/authenticationService');

const authController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authenticationService.login({ email, password });

      return res.status(201).json({
        status: 'success',
        message: 'Login successful',
        data: { accessToken, refreshToken },
      });
    } catch (error) {
      return next(error);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const accessToken = await authenticationService.refreshAccessToken(refreshToken);

      return res.status(200).json({
        status: 'success',
        message: 'Access token refreshed',
        data: { accessToken },
      });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await authenticationService.logout(refreshToken);

      return res.status(200).json({
        status: 'success',
        message: 'Logout successful',
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = authController;
