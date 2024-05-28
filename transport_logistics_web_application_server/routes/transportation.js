import express from 'express';
import {createTransportation, deleteTransportation, getAllTransportations, getTransportation, updateTransportation} from "../controllers/transportation.js";

const router = express.Router();

/**
 * @swagger
 * /api/transportations:
 *  get:
 *      summary: This get all cars from mongodb
 *      tags: [Transportation]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Transportation'
 */
router.get('/api/transportations', getAllTransportations);

/**
 * @swagger
 * /api/transportations/{id}:
 *   get:
 *     summary: Get a transportation by ID.
 *     tags: [Transportation]
 *     description: Retrieve a transportation based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transportation to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested transportation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transportation'
 *       404:
 *         description: Transportation not found.
 */
router.get('/api/transportations/:id', getTransportation);

/**
 * @swagger
 * /api/transportations/addTransportation:
 *   post:
 *     summary: Add a new transportation.
 *     tags: [Transportation]
 *     description: Add a new transportation to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transportation'
 *     responses:
 *       201:
 *         description: The newly created transportation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transportation'
 *       400:
 *         description: Bad request.
 */
router.post('/api/transportations/addTransportation', createTransportation);

/**
 * @swagger
 * /api/transportations/{id}:
 *   put:
 *     summary: Update a transportation.
 *     tags: [Transportation]
 *     description: Update a transportation in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transportation to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transportation'
 *     responses:
 *       200:
 *         description: The updated transportation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transportation'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Transportation not found.
 */
router.put('/api/transportations/:id', updateTransportation);

/**
 * @swagger
 * /api/transportations/{id}:
 *   delete:
 *     summary: Delete a transportation.
 *     tags: [Transportation]
 *     description: Delete a transportation from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transportation to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transportation deleted successfully.
 *       404:
 *         description: Transportation not found.
 */
router.delete('/api/transportations/:id', deleteTransportation);

export default router;
