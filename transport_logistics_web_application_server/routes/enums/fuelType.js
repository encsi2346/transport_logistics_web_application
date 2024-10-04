import express from 'express';
import {getAllFuelTypes} from "../../controllers/enums/fuelType.js";

const router = express.Router();

/**
 * @swagger
 * /api/fuelTypes:
 *   get:
 *     summary: Get all fuelTypes.
 *     tags: [FuelType]
 *     description: Retrieve a list of all fuel types.
 *     responses:
 *       200:
 *         description: A list of fuel types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve fuelTypes.
 */
router.get('/api/fuelTypes', getAllFuelTypes);

export default router;
