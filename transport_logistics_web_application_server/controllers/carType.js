import CarType from '../models/CarType.js';
import ProductCategory from "../models/ProductCategory.js";
import Product from "../models/Product.js";
import CarTypeOfTransportation from "../models/CarTypeOfTransportation.js";
import User from "../models/User.js";

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
            long,
            carTypeOfTransportationId
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
            long,
            carTypeOfTransportationId
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
            carType.carTypeOfTransportationId = req.body.carTypeOfTransportationId;
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

export const paginatedCarType = async (req, res) => {
    try {
        const { featured, typeName, carTypeOfTransportationId, sortBy, page = 1, limit = 10 } = req.query;
        const query = {};
        //query.quantity = { $gte: 1 }
        if (featured) {
            query.featured = true;
        }
        if (carTypeOfTransportationId) {
            try {
                // Find the category by ID
                const typeOfTransportationData = await CarTypeOfTransportation.findOne({ _id: carTypeOfTransportationId });

                // Check if category data is found
                if (!typeOfTransportationData) {
                    return res.status(400).json({ error: 'TransportationPlan type not found' });
                }
                query.carTypeOfTransportationId = typeOfTransportationData._id;
            } catch (err) {
                console.error('Error while fetching type of transportation:', err);
                return res.status(500).json({ error: 'Error retrieving type of transportation data' });
            }
        }
        if (typeName) {
            query.typeName = typeName;
        }

        const parsedPage = parseInt(page, 10) || 1;  // Default page to 1 if invalid
        const parsedLimit = parseInt(limit, 10) || 10;  // Default limit to 10 if invalid

        const options = {
            skip: (parsedPage - 1) * parsedLimit,
            limit: parsedLimit,
            sort: sortBy === "asc" ? { typeName: 1 } : { typeName: -1 },
        };

        const carTypes = await CarType.find(query, null, options).populate("carTypeOfTransportationId", "typeName");
        const total = await CarType.countDocuments(query);
        const totalPublished = await CarType.countDocuments({ isDisplayed: true, ...query });

        console.log('carTypes', carTypes);

        const totalPages = Math.ceil(total / parsedLimit);
        const paginatedCarTypes = {
            carTypes,
            total,
            limit: parsedLimit,
            page: parsedPage,
            pages: totalPages,
            totalPublished
        };
        return res.status(200).send(paginatedCarTypes);
    } catch (error) {
        console.error('Error in getPaginatedCarTypes middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const searchCarTypes = async (req, res) => {
    try {
        const { brand } = req.query;
        console.log('Search query:', req.query);

        const query = {};
        if (brand) query.brand = brand; //{ $regex: brand, $options: 'i' };

        const carTypes = await CarType.find(query);
        res.json({ content: carTypes });
    } catch (error) {
        console.error('Error fetching cartypes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}