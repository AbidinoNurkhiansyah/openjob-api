const express = require('express');
const categoryController = require('../controllers/categoryController');
const validate = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategorySchema, updateCategorySchema } = require('../validations/categorySchema');

const router = express.Router();

// PUBLIC
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

// PROTECTED
router.post('/', authMiddleware, validate(createCategorySchema), categoryController.addCategory);
router.put('/:id', authMiddleware, validate(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;
