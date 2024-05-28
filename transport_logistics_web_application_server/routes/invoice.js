import express from 'express';
import {createInvoice, deleteInvoice, getAllInvoices, getInvoice, updateInvoice} from "../controllers/invoice.js";

const router = express.Router();

/**
 * @swagger
 * /api/invoices:
 *  get:
 *      summary: This get all invoices from mongodb
 *      tags: [Invoice]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Invoice'
 */
router.get('/api/invoices', getAllInvoices);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get a car by ID.
 *     tags: [Invoice]
 *     description: Retrieve an invoice based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the invoice to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested invoice.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found.
 */
router.get('/api/invoices/:id', getInvoice);

/**
 * @swagger
 * /api/invoices/addInvoice:
 *   post:
 *     summary: Add a new invoice.
 *     tags: [Invoice]
 *     description: Add a new invoice to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: The newly created invoice.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Bad request.
 */
router.post('/api/invoices/addInvoice', createInvoice);

/**
 * @swagger
 * /api/invoices/{id}:
 *   put:
 *     summary: Update an invoice.
 *     tags: [Invoice]
 *     description: Update an invoice in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the invoice to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: The updated invoice.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Invoice not found.
 */
router.put('/api/invoices/:id', updateInvoice);

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     summary: Delete a invoice.
 *     tags: [Invoice]
 *     description: Delete a invoice from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the invoice to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice deleted successfully.
 *       404:
 *         description: Invoice not found.
 */
router.delete('/api/invoices/:id', deleteInvoice);

export default router;
