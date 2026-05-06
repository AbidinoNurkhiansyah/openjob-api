const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const InvariantError = require('../utils/InvariantError');
const NotFoundError = require('../utils/NotFoundError');
const AuthenticationError = require('../utils/AuthenticationError');

const userRepository = {
  async addUser({ name, email, password }) {
    // Check if email already exists
    const checkQuery = {
      text: 'SELECT id FROM users WHERE email = $1',
      values: [email],
    };
    const checkResult = await pool.query(checkQuery);

    if (checkResult.rows.length > 0) {
      throw new InvariantError('Email is already registered');
    }

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, name, email, hashedPassword],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getUserById(id) {
    const query = {
      text: 'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User not found');
    }

    return result.rows[0];
  },

  async getUserByEmail(email) {
    const query = {
      text: 'SELECT id, name, email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User not found');
    }

    return result.rows[0];
  },

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError('Invalid credentials');
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Invalid credentials');
    }

    return id;
  },
};

module.exports = userRepository;
