const applicationService = require('../services/applicationService');
const cacheService = require('../services/cacheService');
const mqService = require('../services/mqService');

const applicationController = {
  async addApplication(req, res, next) {
    try {
      const { user_id, job_id } = req.body;
      const applicationId = await applicationService.addApplication({ user_id, job_id });

      await mqService.sendMessage('application:create', { application_id: applicationId });

      await cacheService.delete(`applications:user:${user_id}`);
      await cacheService.delete(`applications:job:${job_id}`);

      return res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully',
        data: { 
          id: applicationId,
          user_id,
          job_id,
          status: 'pending'
        },
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
      const cacheKey = `application:${id}`;
      
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: JSON.parse(cached),
        });
      }

      const application = await applicationService.getApplicationById(id);
      await cacheService.set(cacheKey, JSON.stringify(application), 3600);

      res.setHeader('X-Data-Source', 'database');
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
      const cacheKey = `applications:user:${userId}`;
      
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: { applications: JSON.parse(cached) },
        });
      }

      const applications = await applicationService.getApplicationsByUserId(userId);
      await cacheService.set(cacheKey, JSON.stringify(applications), 3600);

      res.setHeader('X-Data-Source', 'database');
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
      const cacheKey = `applications:job:${jobId}`;
      
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: { applications: JSON.parse(cached) },
        });
      }

      const applications = await applicationService.getApplicationsByJobId(jobId);
      await cacheService.set(cacheKey, JSON.stringify(applications), 3600);

      res.setHeader('X-Data-Source', 'database');
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
      const application = await applicationService.getApplicationById(id);
      await applicationService.updateApplication(id, { status });

      await cacheService.delete(`application:${id}`);
      await cacheService.delete(`applications:user:${application.user_id}`);
      await cacheService.delete(`applications:job:${application.job_id}`);

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
      const application = await applicationService.getApplicationById(id);
      await applicationService.deleteApplication(id);

      await cacheService.delete(`application:${id}`);
      await cacheService.delete(`applications:user:${application.user_id}`);
      await cacheService.delete(`applications:job:${application.job_id}`);

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
