import express from 'express';
import {getAllDocumentStatus} from "../../controllers/states/documentStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/documentStatus:
 *   get:
 *     summary: Get all documentStatus.
 *     tags: [DocumentStatus]
 *     description: Retrieve a list of all documentStatus types.
 *     responses:
 *       200:
 *         description: A list of documentStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve documentStatus.
 */
router.get('/api/documentStatus', getAllDocumentStatus);

export default router;
