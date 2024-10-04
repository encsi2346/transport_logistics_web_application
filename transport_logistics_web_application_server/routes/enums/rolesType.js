import express from 'express';
import {getAllRoles} from "../../controllers/enums/rolesType.js";

const router = express.Router();

/**
 * @swagger
 * /api/rolesTypes:
 *   get:
 *     summary: Get all rolesTypes.
 *     tags: [RolesType]
 *     description: Retrieve a list of all roles types.
 *     responses:
 *       200:
 *         description: A list of roles types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve rolesTypes.
 */
router.get('/api/rolesTypes', getAllRoles);

export default router;
