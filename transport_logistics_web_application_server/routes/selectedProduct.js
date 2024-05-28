import express from 'express';
import {createSelectedProduct, deleteSelectedProduct, getAllSelectedProducts, getSelectedProduct, updateSelectedProduct} from "../controllers/selectedProduct.js";

const router = express.Router();

/**
 * @swagger
 * /api/selectedProducts:
 *  get:
 *      summary: This get all selected products from mongodb
 *      tags: [SelectedProduct]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/SelectedProduct'
 */
router.get('/api/selectedProducts', getAllSelectedProducts);

/**
 * @swagger
 * /api/selectedProducts/{id}:
 *   get:
 *     summary: Get a selected product by ID.
 *     tags: [SelectedProduct]
 *     description: Retrieve a selected product based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the selected product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested selected product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProduct'
 *       404:
 *         description: SelectedProduct not found.
 */
router.get('/api/selectedProducts/:id', getSelectedProduct);

/**
 * @swagger
 * /api/selectedProducts/addSelectedProduct:
 *   post:
 *     summary: Add a new selected product.
 *     tags: [SelectedProduct]
 *     description: Add a new selected product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelectedProduct'
 *     responses:
 *       201:
 *         description: The newly created selected product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProduct'
 *       400:
 *         description: Bad request.
 */
router.post('/api/selectedProducts/addSelectedProduct', createSelectedProduct);

/**
 * @swagger
 * /api/selectedProducts/{id}:
 *   put:
 *     summary: Update a selected product.
 *     tags: [SelectedProduct]
 *     description: Update a selected product in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the selected product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelectedProduct'
 *     responses:
 *       200:
 *         description: The updated selected product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProduct'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: SelectedProduct not found.
 */
router.put('/api/selectedProducts/:id', updateSelectedProduct);

/**
 * @swagger
 * /api/selectedProducts/{id}:
 *   delete:
 *     summary: Delete a selected product.
 *     tags: [SelectedProduct]
 *     description: Delete a selected product from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the selected product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SelectedProduct deleted successfully.
 *       404:
 *         description: SelectedProduct not found.
 */
router.delete('/api/selectedProducts/:id', deleteSelectedProduct);

export default router;
