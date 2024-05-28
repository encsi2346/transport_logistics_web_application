import Document from '../models/Document.js';

export const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);
        res.status(200).json(document);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createDocument = async (req, res) => {
    console.log('req', req);
    try {
        const {
            documentId,
            documentType,
            title,
            timeStamp,
            status,
        } = req.body;
        const newDocument = new Document({
            documentId,
            documentType,
            title,
            timeStamp,
            status,
        });
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (req.body.documentId) {
            document.documentId = req.body.documentId;
            document.documentType = req.body.documentType;
            document.title = req.body.title;
            document.timeStamp = req.body.timeStamp;
            document.status = req.body.status;
        }
        const updatedDocument = await document.save();
        res.json(updatedDocument);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        await document.deleteOne();
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};