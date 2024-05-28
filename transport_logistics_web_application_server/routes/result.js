import express from 'express';
import {createResult, deleteResult, getAllResults, getResult, updateResult} from "../controllers/result.js";

const router = express.Router();

/**
 * @swagger
 * /api/results:
 *  get:
 *      summary: This get all results from mongodb
 *      tags: [Result]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Result'
 */
router.get('/api/results', getAllResults);

/**
 * @swagger
 * /api/results/{id}:
 *   get:
 *     summary: Get a result by ID.
 *     tags: [Result]
 *     description: Retrieve a result based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the result to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested result.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       404:
 *         description: Result not found.
 */
router.get('/api/results/:id', getResult);

/**
 * @swagger
 * /api/results/addResult:
 *   post:
 *     summary: Add a new result.
 *     tags: [Result]
 *     description: Add a new result to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Result'
 *     responses:
 *       201:
 *         description: The newly created result.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       400:
 *         description: Bad request.
 */
router.post('/api/results/addResult', createResult);

/**
 * @swagger
 * /api/results/{id}:
 *   put:
 *     summary: Update a result.
 *     tags: [Result]
 *     description: Update a result in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the result to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Result'
 *     responses:
 *       200:
 *         description: The updated result.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Result not found.
 */
router.put('/api/results/:id', updateResult);

/**
 * @swagger
 * /api/results/{id}:
 *   delete:
 *     summary: Delete a result.
 *     tags: [Result]
 *     description: Delete a result from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the result to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Result deleted successfully.
 *       404:
 *         description: Result not found.
 */
router.delete('/api/results/:id', deleteResult);

export default router;
