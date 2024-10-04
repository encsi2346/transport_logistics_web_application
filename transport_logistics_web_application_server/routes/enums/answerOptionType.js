import express from 'express';
import {getAllAnswerOptionTypes} from "../../controllers/enums/answerOptionType.js";

const router = express.Router();

/**
 * @swagger
 * /api/answerOptionTypes:
 *   get:
 *     summary: Get all answerOptionTypes.
 *     tags: [AnswerOptionType]
 *     description: Retrieve a list of all answerOption types.
 *     responses:
 *       200:
 *         description: A list of answerOption types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve answerOptionTypes.
 */
router.get('/api/answerOptionTypes', getAllAnswerOptionTypes);

export default router;
