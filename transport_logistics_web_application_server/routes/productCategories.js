import express from 'express';
import {createProductCategory, deleteProductCategory, getAllProductCategories, getProductCategory, updateProductCategory} from "../controllers/productCategories.js";

const router = express.Router();

/**
 * @swagger
 * /api/product-categories:
 *  get:
 *      summary: This get all product categories from mongodb
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/ProductCategory'
 */
router.get('/api/product-categories', getAllProductCategories);

/**
 * @swagger
 * /api/product-categories/{id}:
 *   get:
 *     summary: Get a product category by ID.
 *     description: Retrieve a product category based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested product category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       404:
 *         description: ProductCategory not found.
 */
router.get('/api/product-categories/:id', getProductCategory);

/**
 * @swagger
 * /api/product-categories/addProductCategory:
 *   post:
 *     summary: Add a new product category.
 *     description: Add a new product category to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategory'
 *     responses:
 *       201:
 *         description: The newly created product category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Bad request.
 */
router.post('/api/product-categories/addBook', createProductCategory);

/**
 * @swagger
 * /api/product-categories/{id}:
 *   put:
 *     summary: Update a product category.
 *     description: Update a product category in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategory'
 *     responses:
 *       200:
 *         description: The updated product category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: ProductCategory not found.
 */
router.put('/api/product-categories/:id', updateProductCategory);

/**
 * @swagger
 * /api/product-categories/{id}:
 *   delete:
 *     summary: Delete a product category.
 *     description: Delete a product category from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ProductCategory deleted successfully.
 *       404:
 *         description: ProductCategory not found.
 */
router.delete('/api/product-categories/:id', deleteProductCategory);

export default router;
