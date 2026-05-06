const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { loginSchema } = require('../validations/userSchema');
const { refreshTokenSchema } = require('../validations/authSchema');

const router = express.Router();

// PUBLIC
router.post('/', validate(loginSchema), authController.login);
router.put('/', validate(refreshTokenSchema), authController.refreshToken);

// PROTECTED
router.delete('/', authMiddleware, authController.logout);

module.exports = router;
