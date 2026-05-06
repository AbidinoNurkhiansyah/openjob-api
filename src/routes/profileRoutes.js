const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// ALL PROTECTED
router.use(authMiddleware);

router.get('/', profileController.getProfile);
router.get('/applications', profileController.getMyApplications);
router.get('/bookmarks', profileController.getMyBookmarks);

module.exports = router;
