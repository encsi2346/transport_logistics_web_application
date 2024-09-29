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
            carTypeId,
            brand,
            typeName,
            design,
            performance,
            selfWeight,
            numberOfSeats,
            fuel,
            usefulWeight,
            vontatas,
            height,
            szelesseg,
            long
        } = req.body;
        const newCarType = new CarType({
            carTypeId,
            brand,
            typeName,
            design,
            performance,
            selfWeight,
            numberOfSeats,
            fuel,
            usefulWeight,
            vontatas,
            height,
            szelesseg,
            long
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
        if (req.body.carTypeId) {
            carType.carTypeId = req.body.carTypeId;
            carType.brand = req.body.brand;
            carType.typeName = req.body.typeName;
            carType.design = req.body.design;
            carType.performance = req.body.performance;
            carType.selfWeight = req.body.selfWeight;
            carType.numberOfSeats = req.body.numberOfSeats;
            carType.fuel = req.body.fuel;
            carType.usefulWeight = req.body.usefulWeight;
            carType.vontatas = req.body.vontatas;
            carType.height = req.body.height;
            carType.szelesseg = req.body.szelesseg;
            carType.long = req.body.long;
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