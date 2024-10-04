import express from 'express';
import {getAllRequestStatus} from "../../controllers/states/requestStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/requestStatus:
 *   get:
 *     summary: Get all requestStatus.
 *     tags: [RequestStatus]
 *     description: Retrieve a list of all requestStatus types.
 *     responses:
 *       200:
 *         description: A list of requestStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve requestStatus.
 */
router.get('/api/requestStatus', getAllRequestStatus);

export default router;
