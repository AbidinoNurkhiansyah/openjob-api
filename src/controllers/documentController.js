const documentService = require('../services/documentService');

const documentController = {
  async addDocument(req, res, next) {
    try {
      const user_id = req.userId;

      if (!req.file) {
        return res.status(400).json({
          status: 'fail',
          message: 'No file uploaded',
        });
      }

      const file_url = `/uploads/${req.file.filename}`;
      const documentId = await documentService.addDocument({ user_id, file_url });

      return res.status(201).json({
        status: 'success',
        message: 'Document uploaded successfully',
        data: { documentId },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getDocuments(req, res, next) {
    try {
      const documents = await documentService.getDocuments();

      return res.status(200).json({
        status: 'success',
        data: { documents },
      });
    } catch (error) {
      return next(error);
    }
  },

  async getDocumentById(req, res, next) {
    try {
      const { id } = req.params;
      const document = await documentService.getDocumentById(id);

      return res.status(200).json({
        status: 'success',
        data: { document },
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteDocument(req, res, next) {
    try {
      const { id } = req.params;
      await documentService.deleteDocument(id);

      return res.status(200).json({
        status: 'success',
        message: 'Document deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = documentController;
