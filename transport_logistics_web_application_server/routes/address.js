import express from 'express';
import {createAddress, deleteAddress, getAllAddresses, getAddress, updateAddress} from "../controllers/address.js";

const router = express.Router();

/**
 * @swagger
 * /api/addresses:
 *  get:
 *      summary: This get all addresses from mongodb
 *      tags: [Address]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Address'
 */
router.get('/api/addresses', getAllAddresses);

/**
 * @swagger
 * /api/addresses/{id}:
 *   get:
 *     summary: Get an address by ID.
 *     tags: [Address]
 *     description: Retrieve an address based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the address to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found.
 */
router.get('/api/addresses/:id', getAddress);

/**
 * @swagger
 * /api/addresses/addAddress:
 *   post:
 *     summary: Add a new address.
 *     tags: [Address]
 *     description: Add a new address to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: The newly created address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request.
 */
router.post('/api/addresses/addAddress', createAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   put:
 *     summary: Update an address.
 *     tags: [Address]
 *     description: Update an address in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the address to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: The updated address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Address not found.
 */
router.put('/api/addresses/:id', updateAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *     summary: Delete an address.
 *     tags: [Address]
 *     description: Delete an address from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the address to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully.
 *       404:
 *         description: Address not found.
 */
router.delete('/api/addresses/:id', deleteAddress);

export default router;
