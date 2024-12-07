import express from 'express';
import {
    createServiceAppointment,
    deleteServiceAppointment, getAllServiceAppointments, getServiceAppointment, updateServiceAppointment
} from "../controllers/serviceAppointment.js";

const router = express.Router();

/**
 * @swagger
 * /api/serviceAppointments:
 *  get:
 *      summary: This get all services from mongodb
 *      tags: [ServiceAppointment]
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/ServiceAppointment'
 */
router.get('/api/services', getAllServiceAppointments);

/**
 * @swagger
 * /api/serviceAppointments/{id}:
 *   get:
 *     summary: Get a service by ID.
 *     tags: [ServiceAppointment]
 *     description: Retrieve a service based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested service.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceAppointment'
 *       404:
 *         description: ServiceAppointment not found.
 */
router.get('/api/services/:id', getServiceAppointment);

/**
 * @swagger
 * /api/serviceAppointments/addServiceAppointment:
 *   post:
 *     summary: Add a new service Appointment.
 *     tags: [ServiceAppointment]
 *     description: Add a new service to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceAppointment'
 *     responses:
 *       201:
 *         description: The newly created service.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceAppointment'
 *       400:
 *         description: Bad request.
 */
router.post('/api/serviceAppointments/addServiceAppointment', createServiceAppointment);

/**
 * @swagger
 * /api/serviceAppointments/{id}:
 *   put:
 *     summary: Update a service Appointment.
 *     tags: [ServiceAppointment]
 *     description: Update a service in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceAppointment'
 *     responses:
 *       200:
 *         description: The updated service.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceAppointment'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: ServiceAppointment not found.
 */
router.put('/api/serviceAppointments/:id', updateServiceAppointment);

/**
 * @swagger
 * /api/serviceAppointments/{id}:
 *   delete:
 *     summary: Delete a service Appointment.
 *     tags: [ServiceAppointment]
 *     description: Delete a service from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ServiceAppointment deleted successfully.
 *       404:
 *         description: ServiceAppointment not found.
 */
router.delete('/api/serviceAppointments/:id', deleteServiceAppointment);

export default router;
