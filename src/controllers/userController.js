const userService = require('../services/userService');

const userController = {
  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const userId = await userService.addUser({ name, email, password, role });

      return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: { id: userId },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userController;
