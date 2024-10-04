import express from 'express';
import {getAllAnswerObjectTypes} from "../../controllers/enums/answerObjectType.js";

const router = express.Router();

/**
 * @swagger
 * /api/answerObjectTypes:
 *   get:
 *     summary: Get all answerObjectTypes.
 *     tags: [AnswerObjectType]
 *     description: Retrieve a list of all answerObject types.
 *     responses:
 *       200:
 *         description: A list of answerObject types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve answerObjectTypes.
 */
router.get('/api/answerObjectTypes', getAllAnswerObjectTypes);

export default router;
