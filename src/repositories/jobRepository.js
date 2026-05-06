const { nanoid } = require('nanoid');
const pool = require('../config/database');
const NotFoundError = require('../utils/NotFoundError');

const jobRepository = {
  async addJob({ title, description, company_id, category_id }) {
    const id = `job-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO jobs (id, title, description, company_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, title, description || null, company_id, category_id],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getJobs({ title, companyName } = {}) {
    let queryText = `
      SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
      FROM jobs
      LEFT JOIN companies ON jobs.company_id = companies.id
      LEFT JOIN categories ON jobs.category_id = categories.id
    `;
    const values = [];
    const conditions = [];

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`jobs.title ILIKE $${values.length}`);
    }

    if (companyName) {
      values.push(`%${companyName}%`);
      conditions.push(`companies.name ILIKE $${values.length}`);
    }

    if (conditions.length > 0) {
      queryText += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await pool.query(queryText, values);
    return result.rows;
  },

  async getJobById(id) {
    const query = {
      text: `
        SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
        FROM jobs
        LEFT JOIN companies ON jobs.company_id = companies.id
        LEFT JOIN categories ON jobs.category_id = categories.id
        WHERE jobs.id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Job not found');
    }

    return result.rows[0];
  },

  async getJobsByCompanyId(companyId) {
    const query = {
      text: `
        SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
        FROM jobs
        LEFT JOIN companies ON jobs.company_id = companies.id
        LEFT JOIN categories ON jobs.category_id = categories.id
        WHERE jobs.company_id = $1
      `,
      values: [companyId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async getJobsByCategoryId(categoryId) {
    const query = {
      text: `
        SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
        FROM jobs
        LEFT JOIN companies ON jobs.company_id = companies.id
        LEFT JOIN categories ON jobs.category_id = categories.id
        WHERE jobs.category_id = $1
      `,
      values: [categoryId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async updateJob(id, { title, description, company_id, category_id }) {
    const query = {
      text: 'UPDATE jobs SET title = $1, description = $2, company_id = $3, category_id = $4 WHERE id = $5 RETURNING id',
      values: [title, description || null, company_id, category_id, id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Job not found');
    }

    return result.rows[0].id;
  },

  async deleteJob(id) {
    const query = {
      text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Job not found');
    }
  },
};

module.exports = jobRepository;
