import express from 'express';
import {createOrder, deleteOrder, getAllOrders, getOrder, updateOrder} from "../controllers/order.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *  get:
 *      summary: This get all orders from mongodb
 *      tags: [Order]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Order'
 */
router.get('/api/orders', getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID.
 *     tags: [Order]
 *     description: Retrieve an order based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 */
router.get('/api/orders/:id', getOrder);

/**
 * @swagger
 * /api/orders/addOrder:
 *   post:
 *     summary: Add a new order.
 *     tags: [Order]
 *     description: Add a new order to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The newly created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request.
 */
router.post('/api/orders/addOrder', createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order.
 *     tags: [Order]
 *     description: Update an order in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The updated order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Order not found.
 */
router.put('/api/orders/:id', updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order.
 *     tags: [Order]
 *     description: Delete an order from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *       404:
 *         description: Order not found.
 */
router.delete('/api/orders/:id', deleteOrder);

export default router;
