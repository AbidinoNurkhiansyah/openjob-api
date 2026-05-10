const jobService = require('../services/jobService');

const jobController = {
  async addJob(req, res, next) {
    try {
      const { title, description, company_id, category_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status } = req.body;
      const jobId = await jobService.addJob({ title, description, company_id, category_id, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status });

      return res.status(201).json({
        status: 'success',
        message: 'Job created successfully',
        data: { id: jobId },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getJobs(req, res, next) {
    try {
      const { title } = req.query;
      const companyName = req.query['company-name'];
      const jobs = await jobService.getJobs({ title, companyName });

      return res.status(200).json({
        status: 'success',
        data: { jobs },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getJobById(req, res, next) {
    try {
      const { id } = req.params;
      const job = await jobService.getJobById(id);

      return res.status(200).json({
        status: 'success',
        data: job,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getJobsByCompanyId(req, res, next) {
    try {
      const { companyId } = req.params;
      const jobs = await jobService.getJobsByCompanyId(companyId);

      return res.status(200).json({
        status: 'success',
        data: { jobs },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getJobsByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const jobs = await jobService.getJobsByCategoryId(categoryId);

      return res.status(200).json({
        status: 'success',
        data: { jobs },
      });
    } catch (error) {
      return next(error);
    }
  },

  async updateJob(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
      await jobService.updateJob(id, updates);

      return res.status(200).json({
        status: 'success',
        message: 'Job updated successfully',
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteJob(req, res, next) {
    try {
      const { id } = req.params;
      await jobService.deleteJob(id);

      return res.status(200).json({
        status: 'success',
        message: 'Job deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = jobController;
