import express from 'express';
import {getAllDrivingLicenceTypes} from "../../controllers/enums/drivingLicenceType.js";

const router = express.Router();

/**
 * @swagger
 * /api/drivingLicenceTypes:
 *   get:
 *     summary: Get all drivingLicenceTypes.
 *     tags: [DrivingLicenceType]
 *     description: Retrieve a list of all drivingLicence types.
 *     responses:
 *       200:
 *         description: A list of drivingLicence types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve drivingLicenceTypes.
 */
router.get('/api/drivingLicenceTypes', getAllDrivingLicenceTypes);

export default router;
