import express from 'express';
import {getAllOrderStatus} from "../../controllers/states/orderStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/orderStatus:
 *   get:
 *     summary: Get all orderStatus.
 *     tags: [OrderStatus]
 *     description: Retrieve a list of all orderStatus types.
 *     responses:
 *       200:
 *         description: A list of orderStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve orderStatus.
 */
router.get('/api/orderStatus', getAllOrderStatus);

export default router;
