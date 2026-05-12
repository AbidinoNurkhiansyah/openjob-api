const companyService = require('../services/companyService');
const cacheService = require('../services/cacheService');

const companyController = {
  async addCompany(req, res, next) {
    try {
      const { name, location, description } = req.body;
      const user_id = req.userId; // Owner
      const companyId = await companyService.addCompany({ name, location, description, user_id });

      return res.status(201).json({
        status: 'success',
        message: 'Company created successfully',
        data: { id: companyId },
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
      const cacheKey = `company:${id}`;
      
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: JSON.parse(cached),
        });
      }

      const company = await companyService.getCompanyById(id);
      await cacheService.set(cacheKey, JSON.stringify(company), 3600);

      res.setHeader('X-Data-Source', 'database');
      return res.status(200).json({
        status: 'success',
        data: company,
      });
    } catch (error) {
      return next(error);
    }
  },

  async updateCompany(req, res, next) {
    try {
      const { id } = req.params;
      const { name, location, description } = req.body;
      await companyService.updateCompany(id, { name, location, description });
      await cacheService.delete(`company:${id}`);

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
      await cacheService.delete(`company:${id}`);

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
