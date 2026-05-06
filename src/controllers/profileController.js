const userService = require('../services/userService');
const applicationService = require('../services/applicationService');
const bookmarkService = require('../services/bookmarkService');

const profileController = {
  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserById(req.userId);

      return res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getMyApplications(req, res, next) {
    try {
      const applications = await applicationService.getApplicationsByUserId(req.userId);

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
      const bookmarks = await bookmarkService.getBookmarksByUserId(req.userId);

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
