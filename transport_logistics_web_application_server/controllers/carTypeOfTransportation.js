import CarType from '../models/CarType.js';
import CarTypeOfTransportation from "../models/CarTypeOfTransportation.js";

export const getAllCarTypeOfTransportations = async (req, res) => {
    try {
        const carTypeOfTransportations = await CarTypeOfTransportation.find();
        res.status(200).json(carTypeOfTransportations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCarTypeOfTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const carTypeOfTransportation = await CarTypeOfTransportation.findById(id);
        res.status(200).json(carTypeOfTransportation);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createCarTypeOfTransportation = async (req, res) => {
    console.log('req', req);
    try {
        const {
            carTypeOfTransportationId,
            type,
            countOfCars,
        } = req.body;
        const newCarTypeOfTransportation = new CarTypeOfTransportation({
            carTypeOfTransportationId,
            type,
            countOfCars,
        });
        const savedCarTypeOfTransportation = await newCarTypeOfTransportation.save();
        res.status(201).json(savedCarTypeOfTransportation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCarTypeOfTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const carTypeOfTransportation = await CarTypeOfTransportation.findById(id);
        if (!carTypeOfTransportation) {
            return res.status(404).json({ message: 'CarTypeOfTransportation not found' });
        }
        if (req.body.carTypeOfTransportationId) {
            carTypeOfTransportation.carTypeOfTransportationId = req.body.carTypeOfTransportationId;
            carTypeOfTransportation.type = req.body.type;
            carTypeOfTransportation.countOfCars = req.body.countOfCars;
        }
        const updatedCarTypeOfTransportation = await CarTypeOfTransportation.save();
        res.json(updatedCarTypeOfTransportation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCarTypeOfTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const carTypeOfTransportation = await CarTypeOfTransportation.findById(id);
        if (!carTypeOfTransportation) {
            return res.status(404).json({ message: 'CarTypeOfTransportation not found' });
        }
        await carTypeOfTransportation.deleteOne();
        res.json({ message: 'CarTypeOfTransportation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};