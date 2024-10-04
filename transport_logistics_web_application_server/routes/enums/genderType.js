import express from 'express';
import { getAllGenders } from "../../controllers/enums/genderType.js";

const router = express.Router();

/**
 * @swagger
 * /api/genders:
 *   get:
 *     summary: Get all genders.
 *     tags: [Gender]
 *     description: Retrieve a list of all gender types.
 *     responses:
 *       200:
 *         description: A list of gender types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve genders.
 */
router.get('/api/genders', getAllGenders);

export default router;
