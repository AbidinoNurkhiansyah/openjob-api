const { nanoid } = require('nanoid');
const pool = require('../config/database');
const NotFoundError = require('../utils/NotFoundError');

const documentRepository = {
  async addDocument({ user_id, file_url }) {
    const id = `doc-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO documents (id, user_id, file_url) VALUES ($1, $2, $3) RETURNING id',
      values: [id, user_id, file_url],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getDocuments() {
    const query = `
      SELECT documents.*, users.name AS user_name
      FROM documents
      LEFT JOIN users ON documents.user_id = users.id
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  async getDocumentById(id) {
    const query = {
      text: `
        SELECT documents.*, users.name AS user_name
        FROM documents
        LEFT JOIN users ON documents.user_id = users.id
        WHERE documents.id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Document not found');
    }

    return result.rows[0];
  },

  async deleteDocument(id) {
    const query = {
      text: 'DELETE FROM documents WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Document not found');
    }
  },
};

module.exports = documentRepository;
