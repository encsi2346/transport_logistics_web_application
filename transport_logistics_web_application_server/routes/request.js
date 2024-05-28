import express from 'express';
import {createRequest, deleteRequest, getAllRequests, getRequest, updateRequest} from "../controllers/request.js";

const router = express.Router();

/**
 * @swagger
 * /api/requests:
 *  get:
 *      summary: This get all requests from mongodb
 *      tags: [Request]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Request'
 */
router.get('/api/requests', getAllRequests);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get a request by ID.
 *     tags: [Request]
 *     description: Retrieve a request based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the request to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found.
 */
router.get('/api/requests/:id', getRequest);

/**
 * @swagger
 * /api/requests/addRequest:
 *   post:
 *     summary: Add a new request.
 *     tags: [Request]
 *     description: Add a new request to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       201:
 *         description: The newly created request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       400:
 *         description: Bad request.
 */
router.post('/api/requests/addRequest', createRequest);

/**
 * @swagger
 * /api/requests/{id}:
 *   put:
 *     summary: Update a request.
 *     tags: [Request]
 *     description: Update a request in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the request to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       200:
 *         description: The updated request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Request not found.
 */
router.put('/api/requests/:id', updateRequest);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete a request.
 *     tags: [Request]
 *     description: Delete a request from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the request to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request deleted successfully.
 *       404:
 *         description: Request not found.
 */
router.delete('/api/requests/:id', deleteRequest);

export default router;
