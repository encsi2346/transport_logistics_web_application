import express from 'express';
import {getAllTechnicalExamStatus} from "../../controllers/states/technicalExamStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/technicalExamStatus:
 *   get:
 *     summary: Get all technicalExamStatus.
 *     tags: [TechnicalExamStatus]
 *     description: Retrieve a list of all technicalExamStatus types.
 *     responses:
 *       200:
 *         description: A list of technicalExamStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve technicalExamStatus.
 */
router.get('/api/technicalExamStatus', getAllTechnicalExamStatus);

export default router;
