import express from 'express';
import {getAllPositionTypes} from "../../controllers/enums/positionType.js";

const router = express.Router();

/**
 * @swagger
 * /api/positionTypes:
 *   get:
 *     summary: Get all positionTypes.
 *     tags: [PositionType]
 *     description: Retrieve a list of all position types.
 *     responses:
 *       200:
 *         description: A list of position types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve positionTypes.
 */
router.get('/api/positionTypes', getAllPositionTypes);

export default router;
