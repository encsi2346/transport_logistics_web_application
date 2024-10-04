import express from 'express';
import {getAllRouteStatus} from "../../controllers/states/routeStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/routeStatus:
 *   get:
 *     summary: Get all routeStatus.
 *     tags: [RouteStatus]
 *     description: Retrieve a list of all routeStatus types.
 *     responses:
 *       200:
 *         description: A list of routeStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve routeStatus.
 */
router.get('/api/routeStatus', getAllRouteStatus);

export default router;
