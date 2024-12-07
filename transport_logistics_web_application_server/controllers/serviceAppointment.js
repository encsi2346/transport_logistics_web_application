import ServiceAppointment from '../models/ServiceAppointment.js';

export const getAllServiceAppointments = async (req, res) => {
    try {
        const serviceAppointments = await ServiceAppointment.find();
        res.status(200).json(serviceAppointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getServiceAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceAppointment = await ServiceAppointment.findById(id);
        res.status(200).json(serviceAppointment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createServiceAppointment = async (req, res) => {
    console.log('req', req);
    try {
        const {
            serviceId,
            appointment,
            nameOfServiceCompany,
            driverName,
            dateOfRecording,
            grossSumPrice,
            netSumPrice,
            VAT,
            title,
            description,
            reparation,
            car,
        } = req.body;
        const newServiceAppointment = new ServiceAppointment({
            serviceId,
            appointment,
            nameOfServiceCompany,
            driverName,
            dateOfRecording,
            grossSumPrice,
            netSumPrice,
            VAT,
            title,
            description,
            reparation,
            car,
        });
        const savedServiceAppointment = await newServiceAppointment.save();
        res.status(201).json(savedServiceAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateServiceAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceAppointment = await ServiceAppointment.findById(id);
        if (!serviceAppointment) {
            return res.status(404).json({ message: 'ServiceAppointment not found' });
        }
        if (req.body.serviceId) {
            serviceAppointment.serviceId = req.body.serviceId;
            serviceAppointment.appointment = req.body.appointment;
            serviceAppointment.nameOfServiceCompany = req.body.nameOfServiceCompany;
            serviceAppointment.driverName = req.body.driverName;
            serviceAppointment.dateOfRecording = req.body.dateOfRecording;
            serviceAppointment.grossSumPrice = req.body.grossSumPrice;
            serviceAppointment.netSumPrice = req.body.netSumPrice;
            serviceAppointment.VAT = req.body.VAT;
            serviceAppointment.title = req.body.title;
            serviceAppointment.description = req.body.description;
            serviceAppointment.reparation = req.body.reparation;
            serviceAppointment.car = req.body.car;
        }
        const updatedServiceAppointment = await serviceAppointment.save();
        res.json(updatedServiceAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteServiceAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceAppointment = await ServiceAppointment.findById(id);
        if (!serviceAppointment) {
            return res.status(404).json({ message: 'ServiceAppointment not found' });
        }
        await serviceAppointment.deleteOne();
        res.json({ message: 'ServiceAppointment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};