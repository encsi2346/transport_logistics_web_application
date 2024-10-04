import express from 'express';
import {getAllInvoiceStatus} from "../../controllers/states/invoiceStatus.js";

const router = express.Router();

/**
 * @swagger
 * /api/invoiceStatus:
 *   get:
 *     summary: Get all invoiceStatus.
 *     tags: [InvoiceStatus]
 *     description: Retrieve a list of all invoiceStatus types.
 *     responses:
 *       200:
 *         description: A list of invoiceStatus types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: female
 *       500:
 *         description: Failed to retrieve invoiceStatus.
 */
router.get('/api/invoiceStatus', getAllInvoiceStatus);

export default router;
