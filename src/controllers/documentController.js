const documentService = require('../services/documentService');
const path = require('path');
const fs = require('fs');

const documentController = {
  async addDocument(req, res, next) {
    try {
      const user_id = req.userId;

      if (!req.file) {
        return res.status(400).json({
          status: 'failed',
          message: 'File is required',
        });
      }

      const file_url = `/uploads/${req.file.filename}`;
      const original_filename = req.file.originalname;
      const documentId = await documentService.addDocument({ user_id, file_url, original_filename });

      return res.status(201).json({
        status: 'success',
        message: 'Document uploaded successfully',
        data: { 
          documentId,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size
        },
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
      
      const filePath = path.join(__dirname, '../../', document.file_url);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          status: 'failed',
          message: 'File not found on server',
        });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${document.original_filename}"`);
      return res.sendFile(filePath);
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
