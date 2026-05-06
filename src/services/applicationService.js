const applicationRepository = require('../repositories/applicationRepository');

const applicationService = {
  async addApplication({ user_id, job_id }) {
    const applicationId = await applicationRepository.addApplication({ user_id, job_id });
    return applicationId;
  },

  async getApplications() {
    const applications = await applicationRepository.getApplications();
    return applications;
  },

  async getApplicationById(id) {
    const application = await applicationRepository.getApplicationById(id);
    return application;
  },

  async getApplicationsByUserId(userId) {
    const applications = await applicationRepository.getApplicationsByUserId(userId);
    return applications;
  },

  async getApplicationsByJobId(jobId) {
    const applications = await applicationRepository.getApplicationsByJobId(jobId);
    return applications;
  },

  async updateApplication(id, { status }) {
    await applicationRepository.updateApplication(id, { status });
  },

  async deleteApplication(id) {
    await applicationRepository.deleteApplication(id);
  },
};

module.exports = applicationService;
