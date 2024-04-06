import express from 'express';
import {createCar, deleteCar, getAllCars, updateCar} from "../controllers/car.js";

const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *  get:
 *      summary: This get all cars from mongodb
 *      tags: [Cars]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Car'
 */
router.get('/api/cars', getAllCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get a car by ID.
 *     tags: [Cars]
 *     description: Retrieve a car based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found.
 */
router.get('/api/cars/:id', getCar);

/**
 * @swagger
 * /api/cars/addCar:
 *   post:
 *     summary: Add a new car.
 *     tags: [Cars]
 *     description: Add a new car to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The newly created car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Bad request.
 */
router.post('/api/cars/addCar', createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car.
 *     tags: [Cars]
 *     description: Update a car in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: The updated car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Car not found.
 */
router.put('/api/cars/:id', updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car.
 *     tags: [Cars]
 *     description: Delete a car from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully.
 *       404:
 *         description: Car not found.
 */
router.delete('/api/cars/:id', deleteCar);

export default router;
