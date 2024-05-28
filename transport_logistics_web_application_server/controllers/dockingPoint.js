import DockingPoint from '../models/DockingPoint.js';

export const getAllDockingPoints = async (req, res) => {
    try {
        const dockingPoints = await DockingPoint.find();
        res.status(200).json(dockingPoints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDockingPoint = async (req, res) => {
    try {
        const { id } = req.params;
        const dockingPoint = await DockingPoint.findById(id);
        res.status(200).json(dockingPoint);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createDockingPoint = async (req, res) => {
    console.log('req', req);
    try {
        const {
            dockingPointId,
            country,
            postcode,
            city,
            nameOfPublicArea,
            typeOfPublicArea,
            houseNumber,
            departureDate,
            departureTime,
            destinationDate,
            destinationTime,
            isItOwnLocation,
            driverId,
            driverName,
            passengers,
        } = req.body;
        const newDockingPoint = new DockingPoint({
            dockingPointId,
            country,
            postcode,
            city,
            nameOfPublicArea,
            typeOfPublicArea,
            houseNumber,
            departureDate,
            departureTime,
            destinationDate,
            destinationTime,
            isItOwnLocation,
            driverId,
            driverName,
            passengers,
        });
        const savedDockingPoint = await newDockingPoint.save();
        res.status(201).json(savedDockingPoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDockingPoint = async (req, res) => {
    try {
        const { id } = req.params;
        const dockingPoint = await DockingPoint.findById(id);
        if (!dockingPoint) {
            return res.status(404).json({ message: 'DockingPoint not found' });
        }
        if (req.body.dockingPointId) {
            dockingPoint.dockingPointId = req.body.dockingPointId;
            dockingPoint.country = req.body.country;
            dockingPoint.postcode = req.body.postcode;
            dockingPoint.city = req.body.city;
            dockingPoint.nameOfPublicArea = req.body.nameOfPublicArea;
            dockingPoint.typeOfPublicArea = req.body.typeOfPublicArea;
            dockingPoint.houseNumber = req.body.houseNumber;
            dockingPoint.departureDate = req.body.departureDate;
            dockingPoint.departureTime = req.body.departureTime;
            dockingPoint.destinationDate = req.body.destinationDate;
            dockingPoint.destinationTime = req.body.destinationTime;
            dockingPoint.isItOwnLocation = req.body.isItOwnLocation;
            dockingPoint.driverId = req.body.driverId;
            dockingPoint.driverName = req.body.driverName;
            dockingPoint.passengers = req.body.passengers;
        }
        const updatedDockingPoint = await dockingPoint.save();
        res.json(updatedDockingPoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDockingPoint = async (req, res) => {
    try {
        const { id } = req.params;
        const dockingPoint = await DockingPoint.findById(id);
        if (!dockingPoint) {
            return res.status(404).json({ message: 'DockingPoint not found' });
        }
        await dockingPoint.deleteOne();
        res.json({ message: 'DockingPoint deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};