const bookmarkService = require('../services/bookmarkService');
const cacheService = require('../services/cacheService');

const bookmarkController = {
  async addBookmark(req, res, next) {
    try {
      const { jobId } = req.params;
      const user_id = req.userId;
      const bookmarkId = await bookmarkService.addBookmark({ user_id, job_id: jobId });

      await cacheService.delete(`bookmarks:${user_id}`);

      return res.status(201).json({
        status: 'success',
        message: 'Job bookmarked successfully',
        data: { id: bookmarkId },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getBookmarkByJobId(req, res, next) {
    try {
      const { id } = req.params;
      const bookmark = await bookmarkService.getBookmarkById(id);

      return res.status(200).json({
        status: 'success',
        data: bookmark,
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteBookmark(req, res, next) {
    try {
      const { jobId } = req.params;
      const user_id = req.userId;
      await bookmarkService.deleteBookmark(user_id, jobId);

      await cacheService.delete(`bookmarks:${user_id}`);

      return res.status(200).json({
        status: 'success',
        message: 'Bookmark removed successfully',
      });
    } catch (error) {
      return next(error);
    }
  },

  async getAllBookmarks(req, res, next) {
    try {
      const user_id = req.userId;
      const cacheKey = `bookmarks:${user_id}`;

      const cached = await cacheService.get(cacheKey);
      if (cached) {
        res.setHeader('X-Data-Source', 'cache');
        return res.status(200).json({
          status: 'success',
          data: { bookmarks: JSON.parse(cached) },
        });
      }

      const bookmarks = await bookmarkService.getBookmarksByUserId(user_id);
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

module.exports = bookmarkController;
