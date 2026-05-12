const userService = require('../services/userService');
const cacheService = require('../services/cacheService');

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
      const cacheKey = `user:${id}`;

      const cached = await cacheService.get(cacheKey);
      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: JSON.parse(cached),
        });
      }

      const user = await userService.getUserById(id);
      await cacheService.set(cacheKey, JSON.stringify(user), 3600);

      res.setHeader('X-Data-Source', 'database');
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
