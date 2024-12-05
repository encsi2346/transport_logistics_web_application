import Car from '../models/Car.js';
import CarTypeOfTransportation from "../models/CarTypeOfTransportation.js";
import CarType from "../models/CarType.js";

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
            carId,
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
            carId,
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
        if (req.body.carId) {
            car.carId = req.body.carId;
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

export const updateCountOfCars = async () => {
    try {
        // Step 1: For each Car document, increment the countOfCars in the corresponding CarType
        const cars = await Car.find().populate('type');
        const carTypesCountMap = {};

        // Create a map to count the cars per CarType
        cars.forEach(car => {
            const carTypeId = car.type._id;
            if (carTypesCountMap[carTypeId]) {
                carTypesCountMap[carTypeId]++;
            } else {
                carTypesCountMap[carTypeId] = 1;
            }
        });

        // Step 2: Update the countOfCars for each CarType
        for (const carTypeId in carTypesCountMap) {
            await CarType.findByIdAndUpdate(
                carTypeId,
                { countOfCars: carTypesCountMap[carTypeId] },
                { new: true } // Optionally return the updated document
            );
        }

        console.log('Count of cars updated successfully.');
    } catch (error) {
        console.error('Error updating countOfCars:', error);
    }
}

// Function to update countOfCars for each transportation type
export const updateTransportationTypeCounts = async () => {
    try {
        // Step 1: Get all cars with populated 'type' (which refers to CarType)
        const cars = await Car.find().populate('type');

        // Create a map to store the count of cars for each transportation type
        const transportationTypeCounts = {};

        // Step 2: Count the cars for each transportation type
        for (const car of cars) {
            const carType = car.type; // The CarType object
            const transportationTypeId = carType.carTypeOfTransportationId; // The transportation type ID from CarType

            if (transportationTypeCounts[transportationTypeId]) {
                transportationTypeCounts[transportationTypeId]++;
            } else {
                transportationTypeCounts[transportationTypeId] = 1;
            }
        }

        // Step 3: Update the countOfCars for each CarTypeOfTransportation
        for (const transportationTypeId in transportationTypeCounts) {
            const count = transportationTypeCounts[transportationTypeId];

            // Find the CarTypeOfTransportation and update its countOfCars
            await CarTypeOfTransportation.findByIdAndUpdate(
                transportationTypeId,
                { countOfCars: count },
                { new: true } // Optionally return the updated document
            );
        }

        console.log('Transportation type counts updated successfully.');
    } catch (error) {
        console.error('Error updating transportation type counts:', error);
    }
}