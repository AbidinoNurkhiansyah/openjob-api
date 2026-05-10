const jobRepository = require('../repositories/jobRepository');

const jobService = {
  async addJob(data) {
    const jobId = await jobRepository.addJob(data);
    return jobId;
  },

  async getJobs({ title, companyName } = {}) {
    const jobs = await jobRepository.getJobs({ title, companyName });
    return jobs;
  },

  async getJobById(id) {
    const job = await jobRepository.getJobById(id);
    return job;
  },

  async getJobsByCompanyId(companyId) {
    const jobs = await jobRepository.getJobsByCompanyId(companyId);
    return jobs;
  },

  async getJobsByCategoryId(categoryId) {
    const jobs = await jobRepository.getJobsByCategoryId(categoryId);
    return jobs;
  },

  async updateJob(id, updates) {
    await jobRepository.updateJob(id, updates);
  },

  async deleteJob(id) {
    await jobRepository.deleteJob(id);
  },
};

module.exports = jobService;
