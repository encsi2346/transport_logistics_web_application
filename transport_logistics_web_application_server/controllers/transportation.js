import Transportation from '../models/Transportation.js';

export const getAllTransportations = async (req, res) => {
    try {
        const transportations = await Transportation.find();
        res.status(200).json(transportations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const transportation = await Transportation.findById(id);
        res.status(200).json(transportation);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createTransportation = async (req, res) => {
    console.log('req', req);
    try {
        const {
            transportationId,
            selectedCarType,
            selectedCar,
            departurePoint,
            destinationPoint,
            dockingPoints,
            selectedProducts,
            totalWeightsOfSelectedProducts,
        } = req.body;
        const newTransportation = new Transportation({
            transportationId,
            selectedCarType,
            selectedCar,
            departurePoint,
            destinationPoint,
            dockingPoints,
            selectedProducts,
            totalWeightsOfSelectedProducts,
        });
        const savedTransportation = await newTransportation.save();
        res.status(201).json(savedTransportation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const transportation = await Transportation.findById(id);
        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }
        if (req.body.transportationId) {
            transportation.transportationId = req.body.transportationId;
            transportation.selectedCarType = req.body.selectedCarType;
            transportation.selectedCar = req.body.selectedCar;
            transportation.departurePoint = req.body.departurePoint;
            transportation.destinationPoint = req.body.destinationPoint;
            transportation.dockingPoints = req.body.dockingPoints;
            transportation.selectedProducts = req.body.selectedProducts;
            transportation.totalWeightsOfSelectedProducts = req.body.totalWeightsOfSelectedProducts;
        }
        const updatedTransportation = await transportation.save();
        res.json(updatedTransportation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const transportation = await Transportation.findById(id);
        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }await transportation.deleteOne();
        res.json({ message: 'Transportation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};