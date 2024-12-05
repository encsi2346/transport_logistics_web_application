import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    paginatedProduct,
    updateProduct
} from "../controllers/product.js";

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: This get all products from mongodb
 *      tags: [Products]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Product'
 */
router.get('/api/products', getAllProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID.
 *     tags: [Products]
 *     description: Retrieve a product based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
router.get('/api/products/:id', getProduct);

/**
 * @swagger
 * /api/products/addProduct:
 *   post:
 *     summary: Add a new product.
 *     tags: [Products]
 *     description: Add a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The newly created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request.
 */
router.post('/api/products/addProduct', createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product.
 *     tags: [Products]
 *     description: Update a product in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Product not found.
 */
router.put('/api/products/:id', updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product.
 *     tags: [Products]
 *     description: Delete a product from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */
router.delete('/api/products/:id', deleteProduct);


router.get("/api/paginated-products", paginatedProduct);

export default router;
