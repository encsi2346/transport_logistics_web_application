import CarType from '../models/CarType.js';

export const getAllCarTypes = async (req, res) => {
    try {
        const carTypes = await CarType.find();
        res.status(200).json(carTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCarType = async (req, res) => {
    try {
        const { id } = req.params;
        const carType = await CarType.findById(id);
        res.status(200).json(carType);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createCarType = async (req, res) => {
    console.log('req', req);
    try {
        const {
            name,
            design,
            performance,
            selfWeight,
            numberOfSeats,
            fuel,
            usefulWeight
        } = req.body;
        const newCarType = new CarType({
            name,
            design,
            performance,
            selfWeight,
            numberOfSeats,
            fuel,
            usefulWeight
        });
        const savedCarType = await newCarType.save();
        res.status(201).json(savedCarType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCarType = async (req, res) => {
    try {
        const { id } = req.params;
        const carType = await CarType.findById(id);
        if (!carType) {
            return res.status(404).json({ message: 'CarType not found' });
        }
        if (req.body.name) {
            carType.name = req.body.name;
            carType.design = req.body.design;
            carType.performance = req.body.performance;
            carType.selfWeight = req.body.selfWeight;
            carType.numberOfSeats = req.body.numberOfSeats;
            carType.fuel = req.body.fuel;
            carType.usefulWeight = req.body.usefulWeight;
        }
        const updatedCarType = await carType.save();
        res.json(updatedCarType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCarType = async (req, res) => {
    try {
        const { id } = req.params;
        const carType = await CarType.findById(id);
        if (!carType) {
            return res.status(404).json({ message: 'CarType not found' });
        }
        await carType.deleteOne();
        res.json({ message: 'CarType deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};