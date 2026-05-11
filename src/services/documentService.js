const documentRepository = require('../repositories/documentRepository');

const documentService = {
  async addDocument({ user_id, file_url, original_filename }) {
    const documentId = await documentRepository.addDocument({ user_id, file_url, original_filename });
    return documentId;
  },

  async getDocuments() {
    const documents = await documentRepository.getDocuments();
    return documents;
  },

  async getDocumentById(id) {
    const document = await documentRepository.getDocumentById(id);
    return document;
  },

  async deleteDocument(id) {
    await documentRepository.deleteDocument(id);
  },
};

module.exports = documentService;
