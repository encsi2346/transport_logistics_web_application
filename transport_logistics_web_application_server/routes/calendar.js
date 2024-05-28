import express from 'express';
import {
    createCalendar,
    deleteCalendar,
    getAllCalendars,
    getCalendar,
    updateCalendar,
} from "../controllers/calendar.js";

const router = express.Router();

/**
 * @swagger
 * /api/calendars:
 *  get:
 *      summary: This get all calendars from mongodb
 *      tags: [Calendar]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Calendar'
 */
router.get('/api/calendars', getAllCalendars);

/**
 * @swagger
 * /api/calendars/{id}:
 *   get:
 *     summary: Get a calendar by ID.
 *     tags: [Calendar]
 *     description: Retrieve a calendar based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the calendar to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested calendar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       404:
 *         description: Calendar not found.
 */
router.get('/api/calendars/:id', getCalendar);

/**
 * @swagger
 * /api/calendars/addCalendar:
 *   post:
 *     summary: Add a new calendar.
 *     tags: [Calendar]
 *     description: Add a new calendar to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calendar'
 *     responses:
 *       201:
 *         description: The newly created calendar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       400:
 *         description: Bad request.
 */
router.post('/api/calendars/addCalendar', createCalendar);

/**
 * @swagger
 * /api/calendars/{id}:
 *   put:
 *     summary: Update a calendar.
 *     tags: [Calendar]
 *     description: Update a calendar in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the calendar to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calendar'
 *     responses:
 *       200:
 *         description: The updated calendar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Calendar not found.
 */
router.put('/api/calendars/:id', updateCalendar);

/**
 * @swagger
 * /api/calendars/{id}:
 *   delete:
 *     summary: Delete a calendar.
 *     tags: [Calendar]
 *     description: Delete a calendar from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the calendar to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Calendar deleted successfully.
 *       404:
 *         description: Calendar not found.
 */
router.delete('/api/calendars/:id', deleteCalendar);

export default router;
