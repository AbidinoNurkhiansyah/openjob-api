const { nanoid } = require('nanoid');
const pool = require('../config/database');
const NotFoundError = require('../utils/NotFoundError');

const applicationRepository = {
  async addApplication({ user_id, job_id }) {
    const id = `app-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO applications (id, user_id, job_id) VALUES ($1, $2, $3) RETURNING id',
      values: [id, user_id, job_id],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async getApplications() {
    const query = `
      SELECT applications.*, users.name AS user_name, jobs.title AS job_title
      FROM applications
      LEFT JOIN users ON applications.user_id = users.id
      LEFT JOIN jobs ON applications.job_id = jobs.id
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  async getApplicationById(id) {
    const query = {
      text: `
        SELECT applications.*, users.name AS user_name, jobs.title AS job_title
        FROM applications
        LEFT JOIN users ON applications.user_id = users.id
        LEFT JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Application not found');
    }

    return result.rows[0];
  },

  async getApplicationsByUserId(userId) {
    const query = {
      text: `
        SELECT applications.*, jobs.title AS job_title
        FROM applications
        LEFT JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.user_id = $1
      `,
      values: [userId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async getApplicationsByJobId(jobId) {
    const query = {
      text: `
        SELECT applications.*, users.name AS user_name
        FROM applications
        LEFT JOIN users ON applications.user_id = users.id
        WHERE applications.job_id = $1
      `,
      values: [jobId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async updateApplication(id, { status }) {
    const query = {
      text: 'UPDATE applications SET status = $1 WHERE id = $2 RETURNING id',
      values: [status, id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Application not found');
    }

    return result.rows[0].id;
  },

  async deleteApplication(id) {
    const query = {
      text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Application not found');
    }
  },

  async getApplicationDetailsForEmail(id) {
    const query = {
      text: `
        SELECT 
          applications.id,
          applications.created_at AS application_date,
          applicant.name AS applicant_name,
          applicant.email AS applicant_email,
          owner.email AS owner_email
        FROM applications
        JOIN users AS applicant ON applications.user_id = applicant.id
        JOIN jobs ON applications.job_id = jobs.id
        JOIN companies ON jobs.company_id = companies.id
        JOIN users AS owner ON companies.user_id = owner.id
        WHERE applications.id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },
};

module.exports = applicationRepository;
