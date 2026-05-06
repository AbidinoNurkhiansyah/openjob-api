const express = require('express');
const companyController = require('../controllers/companyController');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCompanySchema, updateCompanySchema } = require('../validations/companySchema');

const router = express.Router();

// PUBLIC
router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompanyById);

// PROTECTED
router.post('/', authMiddleware, validate(createCompanySchema), companyController.addCompany);
router.put('/:id', authMiddleware, validate(updateCompanySchema), companyController.updateCompany);
router.delete('/:id', authMiddleware, companyController.deleteCompany);

module.exports = router;
