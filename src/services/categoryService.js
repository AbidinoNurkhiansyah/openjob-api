const categoryRepository = require('../repositories/categoryRepository');

const categoryService = {
  async addCategory({ name }) {
    const categoryId = await categoryRepository.addCategory({ name });
    return categoryId;
  },

  async getCategories() {
    const categories = await categoryRepository.getCategories();
    return categories;
  },

  async getCategoryById(id) {
    const category = await categoryRepository.getCategoryById(id);
    return category;
  },

  async updateCategory(id, { name }) {
    await categoryRepository.updateCategory(id, { name });
  },

  async deleteCategory(id) {
    await categoryRepository.deleteCategory(id);
  },
};

module.exports = categoryService;
