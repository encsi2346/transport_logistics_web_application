import express from 'express';
import {createTransportation, deleteTransportation, getAllTransportations, getTransportation, updateTransportation} from "../controllers/transportation.js";

const router = express.Router();

/**
 * @swagger
 * /api/transportations:
 *  get:
 *      summary: This get all cars from mongodb
 *      tags: [TransportationPlan]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/TransportationPlan'
 */
router.get('/api/transportations', getAllTransportations);

/**
 * @swagger
 * /api/transportations/{id}:
 *   get:
 *     summary: Get a transportation by ID.
 *     tags: [TransportationPlan]
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
 *               $ref: '#/components/schemas/TransportationPlan'
 *       404:
 *         description: TransportationPlan not found.
 */
router.get('/api/transportations/:id', getTransportation);

/**
 * @swagger
 * /api/transportations/addTransportation:
 *   post:
 *     summary: Add a new transportation.
 *     tags: [TransportationPlan]
 *     description: Add a new transportation to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransportationPlan'
 *     responses:
 *       201:
 *         description: The newly created transportation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportationPlan'
 *       400:
 *         description: Bad request.
 */
router.post('/api/transportations/addTransportation', createTransportation);

/**
 * @swagger
 * /api/transportations/{id}:
 *   put:
 *     summary: Update a transportation.
 *     tags: [TransportationPlan]
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
 *             $ref: '#/components/schemas/TransportationPlan'
 *     responses:
 *       200:
 *         description: The updated transportation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportationPlan'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: TransportationPlan not found.
 */
router.put('/api/transportations/:id', updateTransportation);

/**
 * @swagger
 * /api/transportations/{id}:
 *   delete:
 *     summary: Delete a transportation.
 *     tags: [TransportationPlan]
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
 *         description: TransportationPlan deleted successfully.
 *       404:
 *         description: TransportationPlan not found.
 */
router.delete('/api/transportations/:id', deleteTransportation);

export default router;
