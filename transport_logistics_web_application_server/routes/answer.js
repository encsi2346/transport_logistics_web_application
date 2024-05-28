import express from 'express';
import {createAnswer, deleteAnswer, getAllAnswers, getAnswer, updateAnswer} from "../controllers/answer.js";

const router = express.Router();

/**
 * @swagger
 * /api/answers:
 *  get:
 *      summary: This get all answers from mongodb
 *      tags: [Answer]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Answer'
 */
router.get('/api/answers', getAllAnswers);

/**
 * @swagger
 * /api/answers/{id}:
 *   get:
 *     summary: Get a car by ID.
 *     tags: [Answer]
 *     description: Retrieve an answer based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the answer to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested answer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: Answer not found.
 */
router.get('/api/answers/:id', getAnswer);

/**
 * @swagger
 * /api/answers/addAnswer:
 *   post:
 *     summary: Add a new answer.
 *     tags: [Answer]
 *     description: Add a new answer to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       201:
 *         description: The newly created answer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       400:
 *         description: Bad request.
 */
router.post('/api/answers/addCar', createAnswer);

/**
 * @swagger
 * /api/answers/{id}:
 *   put:
 *     summary: Update an answer.
 *     tags: [Answer]
 *     description: Update an answer in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the answer to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: The updated answer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Answer not found.
 */
router.put('/api/answers/:id', updateAnswer);

/**
 * @swagger
 * /api/answers/{id}:
 *   delete:
 *     summary: Delete an answer.
 *     tags: [Answer]
 *     description: Delete an answer from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the answer to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Answer deleted successfully.
 *       404:
 *         description: Answer not found.
 */
router.delete('/api/answers/:id', deleteAnswer);

export default router;
