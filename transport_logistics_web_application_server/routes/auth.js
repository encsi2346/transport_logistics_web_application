import express from "express";
import {login, registration} from "../controllers/auth.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Authentication]
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. The request body is invalid.
 *       500:
 *         description: Internal server error. Failed to register user.
 */
router.post("/auth/register", registration);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in as an existing user.
 *     tags: [Authentication]
 *     description: Log in using the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for authenticated requests.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Invalid credentials.
 *       500:
 *         description: Internal server error. Failed to log in user.
 */
router.post("/auth/login", login);

export default router;