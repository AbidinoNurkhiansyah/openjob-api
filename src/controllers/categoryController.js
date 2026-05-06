const categoryService = require('../services/categoryService');

const categoryController = {
  async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const categoryId = await categoryService.addCategory({ name });

      return res.status(201).json({
        status: 'success',
        message: 'Category created successfully',
        data: { categoryId },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getCategories();

      return res.status(200).json({
        status: 'success',
        data: { categories },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);

      return res.status(200).json({
        status: 'success',
        data: { category },
      });
    } catch (error) {
      return next(error);
    }
  },

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await categoryService.updateCategory(id, { name });

      return res.status(200).json({
        status: 'success',
        message: 'Category updated successfully',
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);

      return res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = categoryController;
