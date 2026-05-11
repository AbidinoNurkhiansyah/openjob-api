const { nanoid } = require('nanoid');
const pool = require('../config/database');
const NotFoundError = require('../utils/NotFoundError');

const companyRepository = {
  async addCompany({ name, location, description, user_id }) {
    const id = `company-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO companies (id, name, location, description, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, location, description || null, user_id],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getCompanies() {
    const result = await pool.query('SELECT * FROM companies');
    return result.rows;
  },

  async getCompanyById(id) {
    const query = {
      text: 'SELECT * FROM companies WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Company not found');
    }

    return result.rows[0];
  },

  async updateCompany(id, { name, location, description }) {
    const query = {
      text: 'UPDATE companies SET name = $1, location = $2, description = $3 WHERE id = $4 RETURNING id',
      values: [name, location || null, description || null, id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Company not found');
    }

    return result.rows[0].id;
  },

  async deleteCompany(id) {
    const query = {
      text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Company not found');
    }
  },
};

module.exports = companyRepository;
