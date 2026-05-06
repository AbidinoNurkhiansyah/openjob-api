const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validationMiddleware');
const { registerSchema } = require('../validations/userSchema');

const router = express.Router();

// PUBLIC
router.post('/', validate(registerSchema), userController.register);
router.get('/:id', userController.getUserById);

module.exports = router;
