const companyService = require('../services/companyService');

const companyController = {
  async addCompany(req, res, next) {
    try {
      const { name, description } = req.body;
      const companyId = await companyService.addCompany({ name, description });

      return res.status(201).json({
        status: 'success',
        message: 'Company created successfully',
        data: { companyId },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getCompanies(req, res, next) {
    try {
      const companies = await companyService.getCompanies();

      return res.status(200).json({
        status: 'success',
        data: { companies },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getCompanyById(req, res, next) {
    try {
      const { id } = req.params;
      const company = await companyService.getCompanyById(id);

      return res.status(200).json({
        status: 'success',
        data: { company },
      });
    } catch (error) {
      return next(error);
    }
  },

  async updateCompany(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      await companyService.updateCompany(id, { name, description });

      return res.status(200).json({
        status: 'success',
        message: 'Company updated successfully',
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteCompany(req, res, next) {
    try {
      const { id } = req.params;
      await companyService.deleteCompany(id);

      return res.status(200).json({
        status: 'success',
        message: 'Company deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = companyController;
