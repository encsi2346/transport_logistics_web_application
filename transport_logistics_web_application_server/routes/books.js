import express from 'express';
import {createBook, deleteBook, getAllBooks, getBook, updateBook} from "../controllers/books.js";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *  get:
 *      summary: This get all books from mongodb
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Book'
 */
router.get('/api/books', getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID.
 *     description: Retrieve a book based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found.
 */
router.get('/api/books/:id', getBook);

/**
 * @swagger
 * /api/books/addBook:
 *   post:
 *     summary: Add a new book.
 *     description: Add a new book to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The newly created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request.
 */
router.post('/api/books/addBook', createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book.
 *     description: Update a book in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The updated book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Book not found.
 */
router.put('/api/books/:id', updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book.
 *     description: Delete a book from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *       404:
 *         description: Book not found.
 */
router.delete('/api/books/:id', deleteBook);

export default router;
