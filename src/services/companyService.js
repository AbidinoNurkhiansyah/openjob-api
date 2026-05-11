const companyRepository = require('../repositories/companyRepository');

const companyService = {
  async addCompany({ name, location, description, user_id }) {
    const companyId = await companyRepository.addCompany({ name, location, description, user_id });
    return companyId;
  },

  async getCompanies() {
    const companies = await companyRepository.getCompanies();
    return companies;
  },

  async getCompanyById(id) {
    const company = await companyRepository.getCompanyById(id);
    return company;
  },

  async updateCompany(id, { name, location, description }) {
    await companyRepository.updateCompany(id, { name, location, description });
  },

  async deleteCompany(id) {
    await companyRepository.deleteCompany(id);
  },
};

module.exports = companyService;
