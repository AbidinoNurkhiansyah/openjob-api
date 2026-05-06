const express = require('express');
const applicationController = require('../controllers/applicationController');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { createApplicationSchema, updateApplicationSchema } = require('../validations/applicationSchema');

const router = express.Router();

// ALL PROTECTED
router.use(authMiddleware);

router.post('/', validate(createApplicationSchema), applicationController.addApplication);
router.get('/', applicationController.getApplications);
router.get('/:id', applicationController.getApplicationById);
router.get('/user/:userId', applicationController.getApplicationsByUserId);
router.get('/job/:jobId', applicationController.getApplicationsByJobId);
router.put('/:id', validate(updateApplicationSchema), applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
