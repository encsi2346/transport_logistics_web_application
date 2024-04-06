import express from "express";
import {
    getAllUsers,
    getUser,
} from "../controllers/users.js";
//import { verifyToken} from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     tags: [Users]
 *     description: Retrieve a user based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
//router.get("/api/users/:id", verifyToken, getUser);
router.get("/api/users/:id", getUser);

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: This get all users from mongodb
 *      tags: [Users]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/User'
 */
router.get('/api/users', getAllUsers);

export default router;