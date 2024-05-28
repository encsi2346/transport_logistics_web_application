import express from 'express';
import {createCompany, deleteCompany, getAllCompanies, getCompany, updateCompany} from "../controllers/company.js";

const router = express.Router();

/**
 * @swagger
 * /api/companies:
 *  get:
 *      summary: This get all companies from mongodb
 *      tags: [Company]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Company'
 */
router.get('/api/companies', getAllCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get a company by ID.
 *     tags: [Company]
 *     description: Retrieve a company based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the company to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested company.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found.
 */
router.get('/api/companies/:id', getCompany);

/**
 * @swagger
 * /api/companies/addCompany:
 *   post:
 *     summary: Add a new company.
 *     tags: [Company]
 *     description: Add a new company to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: The newly created company.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request.
 */
router.post('/api/companies/addCompany', createCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Update a company.
 *     tags: [Company]
 *     description: Update a company in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the company to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: The updated company.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Company not found.
 */
router.put('/api/companies/:id', updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Delete a company.
 *     tags: [Company]
 *     description: Delete a company from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the company to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully.
 *       404:
 *         description: Company not found.
 */
router.delete('/api/companies/:id', deleteCompany);

export default router;
