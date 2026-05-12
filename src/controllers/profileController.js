const userService = require('../services/userService');
const applicationService = require('../services/applicationService');
const bookmarkService = require('../services/bookmarkService');
const cacheService = require('../services/cacheService');

const profileController = {
  async getProfile(req, res, next) {
    try {
      const cacheKey = `user:${req.userId}`;
      const cached = await cacheService.get(cacheKey);

      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: JSON.parse(cached),
        });
      }

      const user = await userService.getUserById(req.userId);
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

  async getMyApplications(req, res, next) {
    try {
      const cacheKey = `applications:user:${req.userId}`;
      const cached = await cacheService.get(cacheKey);

      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: { applications: JSON.parse(cached) },
        });
      }

      const applications = await applicationService.getApplicationsByUserId(req.userId);
      await cacheService.set(cacheKey, JSON.stringify(applications), 3600);

      res.setHeader('X-Data-Source', 'database');
      return res.status(200).json({
        status: 'success',
        data: { applications },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getMyBookmarks(req, res, next) {
    try {
      const cacheKey = `bookmarks:${req.userId}`;
      const cached = await cacheService.get(cacheKey);

      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: { bookmarks: JSON.parse(cached) },
        });
      }

      const bookmarks = await bookmarkService.getBookmarksByUserId(req.userId);
      await cacheService.set(cacheKey, JSON.stringify(bookmarks), 3600);

      res.setHeader('X-Data-Source', 'database');
      return res.status(200).json({
        status: 'success',
        data: { bookmarks },
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = profileController;
