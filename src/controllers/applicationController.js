const applicationService = require('../services/applicationService');

const applicationController = {
  async addApplication(req, res, next) {
    try {
      const { user_id, job_id } = req.body;
      const applicationId = await applicationService.addApplication({ user_id, job_id });

      return res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully',
        data: { id: applicationId },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getApplications(req, res, next) {
    try {
      const applications = await applicationService.getApplications();

      return res.status(200).json({
        status: 'success',
        data: { applications },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getApplicationById(req, res, next) {
    try {
      const { id } = req.params;
      const application = await applicationService.getApplicationById(id);

      return res.status(200).json({
        status: 'success',
        data: application,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getApplicationsByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const applications = await applicationService.getApplicationsByUserId(userId);

      return res.status(200).json({
        status: 'success',
        data: { applications },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getApplicationsByJobId(req, res, next) {
    try {
      const { jobId } = req.params;
      const applications = await applicationService.getApplicationsByJobId(jobId);

      return res.status(200).json({
        status: 'success',
        data: { applications },
      });
    } catch (error) {
      return next(error);
    }
  },

  async updateApplication(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await applicationService.updateApplication(id, { status });

      return res.status(200).json({
        status: 'success',
        message: 'Application updated successfully',
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteApplication(req, res, next) {
    try {
      const { id } = req.params;
      await applicationService.deleteApplication(id);

      return res.status(200).json({
        status: 'success',
        message: 'Application deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = applicationController;
