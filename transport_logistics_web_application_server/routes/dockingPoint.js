import express from 'express';
import {createDockingPoint, deleteDockingPoint, getAllDockingPoints, getDockingPoint, updateDockingPoint} from "../controllers/dockingPoint.js";

const router = express.Router();

/**
 * @swagger
 * /api/dockingPoints:
 *  get:
 *      summary: This get all dockingPoints from mongodb
 *      tags: [DockingPoint]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/DockingPoint'
 */
router.get('/api/dockingPoints', getAllDockingPoints);

/**
 * @swagger
 * /api/dockingPoints/{id}:
 *   get:
 *     summary: Get a dockingPoint by ID.
 *     tags: [DockingPoint]
 *     description: Retrieve a dockingPoint based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the dockingPoint to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DockingPoint'
 *       404:
 *         description: DockingPoint not found.
 */
router.get('/api/dockingPoints/:id', getDockingPoint);

/**
 * @swagger
 * /api/dockingPoints/addDockingPoint:
 *   post:
 *     summary: Add a new dockingPoint.
 *     tags: [DockingPoint]
 *     description: Add a new dockingPoint to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DockingPoint'
 *     responses:
 *       201:
 *         description: The newly created dockingPoint.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DockingPoint'
 *       400:
 *         description: Bad request.
 */
router.post('/api/dockingPoints/addDockingPoint', createDockingPoint);

/**
 * @swagger
 * /api/dockingPoints/{id}:
 *   put:
 *     summary: Update a dockingPoint.
 *     tags: [DockingPoint]
 *     description: Update a dockingPoint in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the dockingPoint to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DockingPoint'
 *     responses:
 *       200:
 *         description: The updated dockingPoint.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DockingPoint'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: DockingPoint not found.
 */
router.put('/api/dockingPoints/:id', updateDockingPoint);

/**
 * @swagger
 * /api/dockingPoints/{id}:
 *   delete:
 *     summary: Delete a dockingPoint.
 *     tags: [DockingPoint]
 *     description: Delete a dockingPoint from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the dockingPoint to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: DockingPoint deleted successfully.
 *       404:
 *         description: DockingPoint not found.
 */
router.delete('/api/dockingPoints/:id', deleteDockingPoint);

export default router;
