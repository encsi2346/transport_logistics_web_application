import Result from '../models/Result.js';

export const getAllResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Result.findById(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createResult = async (req, res) => {
    console.log('req', req);
    try {
        const {
            _id,
            customer,
            driverId,
            driverName,
            driverEmail,
            scheduledKms,
            typeOfProducts,
            contactPersonName,
            contactPersonPhone,
            contactPersonEmail,
            carId,
            licencePlateOfCar,
            typeOfCar,
            typeOfName,
            scheduledTime,
            description,
            price,
            profit,
            expenses,
        } = req.body;
        const newResult = new Result({
            _id,
            customer,
            driverId,
            driverName,
            driverEmail,
            scheduledKms,
            typeOfProducts,
            contactPersonName,
            contactPersonPhone,
            contactPersonEmail,
            carId,
            licencePlateOfCar,
            typeOfCar,
            typeOfName,
            scheduledTime,
            description,
            price,
            profit,
            expenses,
        });
        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Result.findById(id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        if (req.body._id) {
            result._id = req.body._id;
            result.customer = req.body.customer;
            result.driverId = req.body.driverId;
            result.driverName = req.body.driverName;
            result.driverEmail = req.body.driverEmail;
            result.scheduledKms = req.body.scheduledKms;
            result.typeOfProducts = req.body.typeOfProducts;
            result.contactPersonName = req.body.contactPersonName;
            result.contactPersonPhone = req.body.contactPersonPhone;
            result.contactPersonEmail = req.body.contactPersonEmail;
            result.carId = req.body.carId;
            result.licencePlateOfCar = req.body.licencePlateOfCar;
            result.typeOfCar = req.body.typeOfCar;
            result.typeOfName = req.body.typeOfName;
            result.scheduledTime = req.body.scheduledTime;
            result.description = req.body.description;
            result.price = req.body.price;
            result.profit = req.body.profit;
            result.expenses = req.body.expenses;
        }
        const updatedResult = await result.save();
        res.json(updatedResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Result.findById(id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        await result.deleteOne();
        res.json({ message: 'Result deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};