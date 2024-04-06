import Car from '../models/Car.js';

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        res.status(200).json(car);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createCar = async (req, res) => {
    console.log('req', req);
    try {
        const {
            name,
            type,
            licencePlate,
            numberOfRegistrationLicence,
            chassisNumber,
            yearOfProduction,
            dateOfFirstRegistration,
            images,
            dateOfDatabaseRegistration,
            dateOfLastTechnicalExamination,
            dateOfLastService,
            totalDrivenKm,
            totalTransport,
        } = req.body;
        const newCar = new Car({
            name,
            type,
            licencePlate,
            numberOfRegistrationLicence,
            chassisNumber,
            yearOfProduction,
            dateOfFirstRegistration,
            images,
            dateOfDatabaseRegistration,
            dateOfLastTechnicalExamination,
            dateOfLastService,
            totalDrivenKm,
            totalTransport,
        });
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        if (req.body.name) {
            car.name = req.body.name;
            car.type = req.body.type;
            car.licencePlate = req.body.licencePlate;
            car.numberOfRegistrationLicence = req.body.numberOfRegistrationLicence;
            car.chassisNumber = req.body.chassisNumber;
            car.yearOfProduction = req.body.yearOfProduction;
            car.dateOfFirstRegistration = req.body.dateOfFirstRegistration;
            car.images = req.body.images;
            car.dateOfDatabaseRegistration = req.body.dateOfDatabaseRegistration;
            car.dateOfLastTechnicalExamination = req.body.dateOfLastTechnicalExamination;
            car.dateOfLastService = req.body.dateOfLastService;
            car.totalDrivenKm = req.body.totalDrivenKm;
            car.totalTransport = req.body.totalTransport;
        }
        const updatedCar = await car.save();
        res.json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        await car.deleteOne();
        res.json({ message: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};