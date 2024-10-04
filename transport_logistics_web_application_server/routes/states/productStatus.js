import express from 'express';
import {getAllProductStatus} from "../../controllers/states/productStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/productStatus:
 *   get:
 *     summary: Get all productStatus.
 *     tags: [ProductStatus]
 *     description: Retrieve a list of all productStatus types.
 *     responses:
 *       200:
 *         description: A list of productStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve productStatus.
 */
router.get('/api/productStatus', getAllProductStatus);

export default router;
