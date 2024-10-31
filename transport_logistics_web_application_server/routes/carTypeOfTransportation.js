import express from 'express';
import {
    createCarTypeOfTransportation, deleteCarTypeOfTransportation, getAllCarTypeOfTransportations,
    getCarTypeOfTransportation,
    updateCarTypeOfTransportation
} from "../controllers/carTypeOfTransportation.js";

const router = express.Router();

/**
 * @swagger
 * /api/type-of-transportation:
 *  get:
 *      summary: This get all car type of transportations from mongodb
 *      tags: [CarTypeOfTransportations]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/CarTypeOfTransportation'
 */
router.get('/api/type-of-transportation', getAllCarTypeOfTransportations);

/**
 * @swagger
 * /api/type-of-transportation/{id}:
 *   get:
 *     summary: Get a car type of transportations by ID.
 *     tags: [CarTypeOfTransportations]
 *     description: Retrieve a car type of transportations based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car type of transportations to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested car type of transportations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarTypeOfTransportation'
 *       404:
 *         description: CarTypeOfTransportation not found.
 */
router.get('/api/type-of-transportation/:id', getCarTypeOfTransportation);

/**
 * @swagger
 * /api/type-of-transportation/addCarTypeOfTransportation:
 *   post:
 *     summary: Add a new car type of transportations.
 *     tags: [CarTypeOfTransportations]
 *     description: Add a new car type of transportations to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarTypeOfTransportation'
 *     responses:
 *       201:
 *         description: The newly created car type of transportations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarTypeOfTransportation'
 *       400:
 *         description: Bad request.
 */
router.post('/api/type-of-transportation/addCarTypeOfTransportation', createCarTypeOfTransportation);

/**
 * @swagger
 * /api/type-of-transportation/{id}:
 *   put:
 *     summary: Update a car type of transportations.
 *     tags: [CarTypeOfTransportations]
 *     description: Update a car type of transportations in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car type of transportations to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarTypeOfTransportation'
 *     responses:
 *       200:
 *         description: The updated car type of transportations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarTypeOfTransportation'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: CarTypeOfTransportation not found.
 */
router.put('/api/type-of-transportation/:id', updateCarTypeOfTransportation);

/**
 * @swagger
 * /api/type-of-transportation/{id}:
 *   delete:
 *     summary: Delete a car type of transportations.
 *     tags: [CarTypeOfTransportations]
 *     description: Delete a car typeof transportations from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car type of transportations to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CarTypeOfTransportation deleted successfully.
 *       404:
 *         description: CarTypeOfTransportation not found.
 */
router.delete('/api/type-of-transportation/:id', deleteCarTypeOfTransportation);

export default router;
