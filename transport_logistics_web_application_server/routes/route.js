import express from 'express';
import {createRoute, deleteRoute, getAllRoutes, getRoute, updateRoute} from "../controllers/route.js";

const router = express.Router();

/**
 * @swagger
 * /api/routes:
 *  get:
 *      summary: This get all routes from mongodb
 *      tags: [Route]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Route'
 */
router.get('/api/routes', getAllRoutes);

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Get a route by ID.
 *     tags: [Route]
 *     description: Retrieve a route based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested route.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found.
 */
router.get('/api/routes/:id', getRoute);

/**
 * @swagger
 * /api/routes/addRoute:
 *   post:
 *     summary: Add a new route.
 *     tags: [Route]
 *     description: Add a new route to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: The newly created route.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Bad request.
 */
router.post('/api/routes/addRoute', createRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Update a route.
 *     tags: [Route]
 *     description: Update a route in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: The updated route.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Route not found.
 */
router.put('/api/routes/:id', updateRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   delete:
 *     summary: Delete a route.
 *     tags: [Route]
 *     description: Delete a route from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route deleted successfully.
 *       404:
 *         description: Route not found.
 */
router.delete('/api/routes/:id', deleteRoute);

export default router;
