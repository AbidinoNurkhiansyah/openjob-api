const { nanoid } = require('nanoid');
const pool = require('../config/database');
const InvariantError = require('../utils/InvariantError');

const authenticationRepository = {
  async addRefreshToken({ userId, refreshToken }) {
    const id = `auth-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO authentications (id, user_id, refresh_token) VALUES ($1, $2, $3)',
      values: [id, userId, refreshToken],
    };

    await pool.query(query);
  },

  async verifyRefreshToken(refreshToken) {
    const query = {
      text: 'SELECT refresh_token FROM authentications WHERE refresh_token = $1',
      values: [refreshToken],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Refresh token is not valid');
    }
  },

  async deleteRefreshToken(refreshToken) {
    const query = {
      text: 'DELETE FROM authentications WHERE refresh_token = $1',
      values: [refreshToken],
    };

    await pool.query(query);
  },
};

module.exports = authenticationRepository;
