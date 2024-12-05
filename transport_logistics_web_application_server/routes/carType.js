import express from 'express';
import {
    createCarType,
    deleteCarType,
    getAllCarTypes,
    getCarType,
    paginatedCarType, searchCarTypes,
    updateCarType
} from "../controllers/carType.js";

const router = express.Router();

/**
 * @swagger
 * /api/car-types:
 *  get:
 *      summary: This get all car types from mongodb
 *      tags: [CarTypes]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/CarType'
 */
router.get('/api/car-types', getAllCarTypes);

/**
 * @swagger
 * /api/car-types/{id}:
 *   get:
 *     summary: Get a car types by ID.
 *     tags: [CarTypes]
 *     description: Retrieve a car types based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car types to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested car types.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarType'
 *       404:
 *         description: CarType not found.
 */
router.get('/api/car-types/:id', getCarType);

/**
 * @swagger
 * /api/car-types/addCarType:
 *   post:
 *     summary: Add a new car types.
 *     tags: [CarTypes]
 *     description: Add a new car types to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarType'
 *     responses:
 *       201:
 *         description: The newly created car types.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarType'
 *       400:
 *         description: Bad request.
 */
router.post('/api/car-types/addCarType', createCarType);

/**
 * @swagger
 * /api/car-types/{id}:
 *   put:
 *     summary: Update a car types.
 *     tags: [CarTypes]
 *     description: Update a car types in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car types to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarType'
 *     responses:
 *       200:
 *         description: The updated car types.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarType'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: CarType not found.
 */
router.put('/api/car-types/:id', updateCarType);

/**
 * @swagger
 * /api/car-types/{id}:
 *   delete:
 *     summary: Delete a car types.
 *     tags: [CarTypes]
 *     description: Delete a car types from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car types to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CarType deleted successfully.
 *       404:
 *         description: CarType not found.
 */
router.delete('/api/car-types/:id', deleteCarType);

router.get("/api/paginated-car-type", paginatedCarType);

router.get('/api/car-types/search', searchCarTypes);

export default router;
