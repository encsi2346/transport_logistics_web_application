import express from 'express';
import {createComment, deleteComment, getAllComments, getComment, updateComment} from "../controllers/comment.js";

const router = express.Router();

/**
 * @swagger
 * /api/comments:
 *  get:
 *      summary: This get all comments from mongodb
 *      tags: [Comment]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Comment'
 */
router.get('/api/comments', getAllComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a comment by ID.
 *     tags: [Comment]
 *     description: Retrieve a comment based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found.
 */
router.get('/api/comments/:id', getComment);

/**
 * @swagger
 * /api/comments/addComment:
 *   post:
 *     summary: Add a new comment.
 *     tags: [Comment]
 *     description: Add a new comment to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The newly created comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request.
 */
router.post('/api/comments/addComment', createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment.
 *     tags: [Comment]
 *     description: Update a comment in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The updated comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Comment not found.
 */
router.put('/api/comments/:id', updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment.
 *     tags: [Comment]
 *     description: Delete a comment from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       404:
 *         description: Comment not found.
 */
router.delete('/api/comments/:id', deleteComment);

export default router;
