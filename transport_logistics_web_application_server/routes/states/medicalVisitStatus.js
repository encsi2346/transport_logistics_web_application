import express from 'express';
import {getAllMedicalVisitStatus} from "../../controllers/states/medicalVisitStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/medicalVisitStatus:
 *   get:
 *     summary: Get all medicalVisitStatus.
 *     tags: [MedicalVisitStatus]
 *     description: Retrieve a list of all medicalVisitStatus types.
 *     responses:
 *       200:
 *         description: A list of medicalVisitStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve medicalVisitStatus.
 */
router.get('/api/medicalVisitStatus', getAllMedicalVisitStatus);

export default router;
