const { nanoid } = require('nanoid');
const pool = require('../config/database');
const NotFoundError = require('../utils/NotFoundError');

const categoryRepository = {
  async addCategory({ name, description }) {
    const id = `category-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO categories (id, name, description) VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, description || null],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getCategories() {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  },

  async getCategoryById(id) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Category not found');
    }

    return result.rows[0];
  },

  async updateCategory(id, { name, description }) {
    const query = {
      text: 'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING id',
      values: [name, description || null, id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Category not found');
    }

    return result.rows[0].id;
  },

  async deleteCategory(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Category not found');
    }
  },
};

module.exports = categoryRepository;
