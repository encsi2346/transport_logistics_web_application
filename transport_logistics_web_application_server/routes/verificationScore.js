import express from 'express';
import {createVerificationScore, deleteVerificationScore, getAllVerificationScores, getVerificationScore, updateVerificationScore} from "../controllers/verificationScore.js";

const router = express.Router();

/**
 * @swagger
 * /api/verificationScores:
 *  get:
 *      summary: This get all verificationScores from mongodb
 *      tags: [VerificationScore]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/VerificationScore'
 */
router.get('/api/verificationScores', getAllVerificationScores);

/**
 * @swagger
 * /api/verificationScores/{id}:
 *   get:
 *     summary: Get a verificationScore by ID.
 *     tags: [VerificationScore]
 *     description: Retrieve a verificationScore based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the verificationScore to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested verificationScore.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationScore'
 *       404:
 *         description: VerificationScore not found.
 */
router.get('/api/verificationScores/:id', getVerificationScore);

/**
 * @swagger
 * /api/verificationScores/addVerificationScore:
 *   post:
 *     summary: Add a new verificationScore.
 *     tags: [VerificationScore]
 *     description: Add a new verificationScore to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerificationScore'
 *     responses:
 *       201:
 *         description: The newly created verificationScore.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationScore'
 *       400:
 *         description: Bad request.
 */
router.post('/api/verificationScores/addVerificationScore', createVerificationScore);

/**
 * @swagger
 * /api/verificationScores/{id}:
 *   put:
 *     summary: Update a verificationScore.
 *     tags: [VerificationScore]
 *     description: Update a verificationScore in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the verificationScore to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerificationScore'
 *     responses:
 *       200:
 *         description: The updated verificationScore.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationScore'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: VerificationScore not found.
 */
router.put('/api/verificationScores/:id', updateVerificationScore);

/**
 * @swagger
 * /api/verificationScores/{id}:
 *   delete:
 *     summary: Delete a verificationScore.
 *     tags: [VerificationScore]
 *     description: Delete a verificationScore from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the verificationScore to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: VerificationScore deleted successfully.
 *       404:
 *         description: VerificationScore not found.
 */
router.delete('/api/verificationScores/:id', deleteVerificationScore);

export default router;
