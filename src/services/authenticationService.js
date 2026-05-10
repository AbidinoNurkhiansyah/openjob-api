const userRepository = require('../repositories/userRepository');
const authenticationRepository = require('../repositories/authenticationRepository');
const TokenManager = require('../utils/TokenManager');

const authenticationService = {
  async login({ email, password }) {
    const { id: userId, role } = await userRepository.verifyUserCredential(email, password);

    const accessToken = TokenManager.generateAccessToken({ id: userId, role });
    const refreshToken = TokenManager.generateRefreshToken({ id: userId, role });

    await authenticationRepository.addRefreshToken({ userId, refreshToken });

    return { accessToken, refreshToken };
  },

  async refreshAccessToken(refreshToken) {
    await authenticationRepository.verifyRefreshToken(refreshToken);
    const { id, role } = TokenManager.verifyRefreshToken(refreshToken);

    const accessToken = TokenManager.generateAccessToken({ id, role });
    return accessToken;
  },

  async logout(refreshToken) {
    await authenticationRepository.verifyRefreshToken(refreshToken);
    await authenticationRepository.deleteRefreshToken(refreshToken);
  },
};

module.exports = authenticationService;
