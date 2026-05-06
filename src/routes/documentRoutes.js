const express = require('express');
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// PUBLIC
router.get('/', documentController.getDocuments);
router.get('/:id', documentController.getDocumentById);

// PROTECTED
router.post('/', authMiddleware, upload.single('document'), documentController.addDocument);
router.delete('/:id', authMiddleware, documentController.deleteDocument);

module.exports = router;
