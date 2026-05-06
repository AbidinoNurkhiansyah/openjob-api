const express = require('express');
const jobController = require('../controllers/jobController');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { createJobSchema, updateJobSchema } = require('../validations/jobSchema');

const router = express.Router();

// PUBLIC
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);
router.get('/company/:companyId', jobController.getJobsByCompanyId);
router.get('/category/:categoryId', jobController.getJobsByCategoryId);

// PROTECTED
router.post('/', authMiddleware, validate(createJobSchema), jobController.addJob);
router.put('/:id', authMiddleware, validate(updateJobSchema), jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);

module.exports = router;
