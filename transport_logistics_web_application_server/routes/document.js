import express from 'express';
import {createDocument, deleteDocument, getAllDocuments, getDocument, updateDocument} from "../controllers/document.js";

const router = express.Router();

/**
 * @swagger
 * /api/documents:
 *  get:
 *      summary: This get all documents from mongodb
 *      tags: [Document]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Document'
 */
router.get('/api/documents', getAllDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Get a document by ID.
 *     tags: [Document]
 *     description: Retrieve a document based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the document to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested document.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Document not found.
 */
router.get('/api/documents/:id', getDocument);

/**
 * @swagger
 * /api/documents/addDocument:
 *   post:
 *     summary: Add a new document.
 *     tags: [Document]
 *     description: Add a new document to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       201:
 *         description: The newly created document.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Bad request.
 */
router.post('/api/documents/addDocument', createDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Update a document.
 *     tags: [Document]
 *     description: Update a document in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the document to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       200:
 *         description: The updated document.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Document not found.
 */
router.put('/api/documents/:id', updateDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Delete a document.
 *     tags: [Document]
 *     description: Delete a document from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the document to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted successfully.
 *       404:
 *         description: Document not found.
 */
router.delete('/api/documents/:id', deleteDocument);

export default router;
