const { nanoid } = require('nanoid');
const pool = require('../config/database');
const NotFoundError = require('../utils/NotFoundError');

const jobRepository = {
  async addJob({ title, description, company_id, category_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status }) {
    const id = `job-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO jobs (id, title, description, company_id, category_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      values: [id, title, description || null, company_id, category_id, job_type || null, experience_level || null, location_type || null, location_city || null, salary_min || null, salary_max || null, is_salary_visible || false, status || 'open'],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getJobs({ title, companyName } = {}) {
    let query = `
      SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
      FROM jobs
      LEFT JOIN companies ON jobs.company_id = companies.id
      LEFT JOIN categories ON jobs.category_id = categories.id
    `;

    const conditions = [];
    const values = [];

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`jobs.title ILIKE $${values.length}`);
    }

    if (companyName) {
      values.push(`%${companyName}%`);
      conditions.push(`companies.name ILIKE $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await pool.query(query, values);
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

  async updateJob(id, updates) {
    // Build dynamic update query from provided fields
    const allowedFields = ['title', 'description', 'company_id', 'category_id', 'job_type', 'experience_level', 'location_type', 'location_city', 'salary_min', 'salary_max', 'is_salary_visible', 'status'];
    const setClauses = [];
    const values = [];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        values.push(updates[field]);
        setClauses.push(`${field} = $${values.length}`);
      }
    }

    if (setClauses.length === 0) {
      throw new NotFoundError('Job not found');
    }

    values.push(id);
    const query = {
      text: `UPDATE jobs SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING id`,
      values,
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
