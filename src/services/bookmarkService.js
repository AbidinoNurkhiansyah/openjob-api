const bookmarkRepository = require('../repositories/bookmarkRepository');

const bookmarkService = {
  async addBookmark({ user_id, job_id }) {
    const bookmarkId = await bookmarkRepository.addBookmark({ user_id, job_id });
    return bookmarkId;
  },

  async getBookmarks() {
    const bookmarks = await bookmarkRepository.getBookmarks();
    return bookmarks;
  },

  async getBookmarkById(id) {
    const bookmark = await bookmarkRepository.getBookmarkById(id);
    return bookmark;
  },

  async getBookmarksByUserId(userId) {
    const bookmarks = await bookmarkRepository.getBookmarksByUserId(userId);
    return bookmarks;
  },

  async deleteBookmark(userId, jobId) {
    await bookmarkRepository.deleteBookmark(userId, jobId);
  },
};

module.exports = bookmarkService;
