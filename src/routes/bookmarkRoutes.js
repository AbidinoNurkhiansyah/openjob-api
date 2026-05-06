const express = require('express');
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// ALL PROTECTED
router.use(authMiddleware);

// Bookmark via job
router.post('/jobs/:jobId/bookmark', bookmarkController.addBookmark);
router.get('/jobs/:jobId/bookmark/:id', bookmarkController.getBookmarkByJobId);
router.delete('/jobs/:jobId/bookmark', bookmarkController.deleteBookmark);

// All bookmarks
router.get('/bookmarks', bookmarkController.getAllBookmarks);

module.exports = router;
