import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        res.status(200).json(service);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createService = async (req, res) => {
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
        const newService = new Service({
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
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        if (req.body.serviceId) {
            service.serviceId = req.body.serviceId;
            service.appointment = req.body.appointment;
            service.nameOfServiceCompany = req.body.nameOfServiceCompany;
            service.driverName = req.body.driverName;
            service.dateOfRecording = req.body.dateOfRecording;
            service.grossSumPrice = req.body.grossSumPrice;
            service.netSumPrice = req.body.netSumPrice;
            service.VAT = req.body.VAT;
            service.title = req.body.title;
            service.description = req.body.description;
            service.reparation = req.body.reparation;
            service.car = req.body.car;
        }
        const updatedService = await service.save();
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.deleteOne();
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};