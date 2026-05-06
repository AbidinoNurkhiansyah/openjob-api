const { nanoid } = require('nanoid');
const pool = require('../config/database');
const NotFoundError = require('../utils/NotFoundError');

const bookmarkRepository = {
  async addBookmark({ user_id, job_id }) {
    const id = `bookmark-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO bookmarks (id, user_id, job_id) VALUES ($1, $2, $3) RETURNING id',
      values: [id, user_id, job_id],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getBookmarks() {
    const query = `
      SELECT bookmarks.*, users.name AS user_name, jobs.title AS job_title
      FROM bookmarks
      LEFT JOIN users ON bookmarks.user_id = users.id
      LEFT JOIN jobs ON bookmarks.job_id = jobs.id
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  async getBookmarkById(id) {
    const query = {
      text: `
        SELECT bookmarks.*, jobs.title AS job_title
        FROM bookmarks
        LEFT JOIN jobs ON bookmarks.job_id = jobs.id
        WHERE bookmarks.id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Bookmark not found');
    }

    return result.rows[0];
  },

  async getBookmarksByUserId(userId) {
    const query = {
      text: `
        SELECT bookmarks.*, jobs.title AS job_title
        FROM bookmarks
        LEFT JOIN jobs ON bookmarks.job_id = jobs.id
        WHERE bookmarks.user_id = $1
      `,
      values: [userId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteBookmark(userId, jobId) {
    const query = {
      text: 'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id',
      values: [userId, jobId],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Bookmark not found');
    }
  },
};

module.exports = bookmarkRepository;
