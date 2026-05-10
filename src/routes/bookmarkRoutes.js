const express = require('express');
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Bookmark via job (all protected)
router.post('/jobs/:jobId/bookmark', authMiddleware, bookmarkController.addBookmark);
router.get('/jobs/:jobId/bookmark/:id', authMiddleware, bookmarkController.getBookmarkByJobId);
router.delete('/jobs/:jobId/bookmark', authMiddleware, bookmarkController.deleteBookmark);

// All bookmarks
router.get('/bookmarks', authMiddleware, bookmarkController.getAllBookmarks);

module.exports = router;
