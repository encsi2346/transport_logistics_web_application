import express from 'express';
import {createService, deleteService, getAllServices, getService, updateService} from "../controllers/service.js";

const router = express.Router();

/**
 * @swagger
 * /api/services:
 *  get:
 *      summary: This get all services from mongodb
 *      tags: [Service]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Service'
 */
router.get('/api/services', getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID.
 *     tags: [Service]
 *     description: Retrieve a service based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested service.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found.
 */
router.get('/api/services/:id', getService);

/**
 * @swagger
 * /api/services/addService:
 *   post:
 *     summary: Add a new service.
 *     tags: [Service]
 *     description: Add a new service to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: The newly created service.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request.
 */
router.post('/api/services/addService', createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service.
 *     tags: [Service]
 *     description: Update a service in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: The updated service.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Service not found.
 */
router.put('/api/services/:id', updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service.
 *     tags: [Service]
 *     description: Delete a service from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully.
 *       404:
 *         description: Service not found.
 */
router.delete('/api/services/:id', deleteService);

export default router;
