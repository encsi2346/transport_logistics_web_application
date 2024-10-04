import express from 'express';
import {getAllCommentTypes} from "../../controllers/enums/commentType.js";

const router = express.Router();

/**
 * @swagger
 * /api/commentTypes:
 *   get:
 *     summary: Get all commentTypes.
 *     tags: [CommentType]
 *     description: Retrieve a list of all comment types.
 *     responses:
 *       200:
 *         description: A list of comment types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve commentTypes.
 */
router.get('/api/commentTypes', getAllCommentTypes);

export default router;
