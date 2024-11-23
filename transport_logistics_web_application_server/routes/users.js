import express from "express";
import {
    createUser, deleteUser,
    getAllUsers,
    getUser, getUserImage, removeUserImage, searchUsers, updateUser, uploadUserImage,
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


/**
 * @swagger
 * /api/users/addUser:
 *   post:
 *     summary: Add a new user.
 *     tags: [Users]
 *     description: Add a new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 */
router.post('/api/users/addUser', createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user.
 *     tags: [Users]
 *     description: Update a user in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: User not found.
 */
router.put('/api/users/:id', updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user.
 *     tags: [Users]
 *     description: Delete a user from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete('/api/users/:id', deleteUser);

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search for users by name and/or position
 *     description: Returns a list of users filtered by the provided search criteria.
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         required: false
 *         description: Name of the user to search for.
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         required: false
 *         description: Position of the user to search for.
 *     responses:
 *       200:
 *         description: A list of users that match the search criteria.
 *         content:
 *               application/json:
 *                   schema:
 *                       type: array
 *                       items:
 *                            $ref: '#components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/api/users/search', searchUsers);

//TODO
/**
 * @swagger
 * /api/users/get-image:
 *   get:
 *     summary: Get image of a user.
 *     tags: [Users]
 *     description: Retrieve the image of a user based on their userId.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose image to retrieve.
 *     responses:
 *       200:
 *         description: User image retrieved successfully.
 *       404:
 *         description: User image not found.
 */
router.get("/api/users/get-image", getUserImage);

//TODO
/**
 * @swagger
 * /api/users/upload-image:
 *   post:
 *     summary: Upload or update an image for a user.
 *     tags: [Users]
 *     description: Upload a new image or update the existing image for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: base64
 *     responses:
 *       200:
 *         description: Image updated successfully.
 *       201:
 *         description: New image uploaded successfully.
 *       500:
 *         description: Internal server error.
 */
router.post("/api/users/upload-image", uploadUserImage);

//TODO
/**
 * @swagger
 * /api/users/remove-image:
 *   delete:
 *     summary: Remove a user's image.
 *     tags: [Users]
 *     description: Delete the image associated with a user's userId.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose image to delete.
 *     responses:
 *       200:
 *         description: Image deleted successfully.
 *       404:
 *         description: Image not found.
 */
router.delete("/api/users/remove-image", removeUserImage);

export default router;