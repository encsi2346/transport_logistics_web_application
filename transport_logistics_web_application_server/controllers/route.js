import Route from '../models/Route.js';

export const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await Route.findById(id);
        res.status(200).json(route);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createRoute = async (req, res) => {
    console.log('req', req);
    try {
        const {
            _id,
            scheduledArrival,
            actualArrival,
            address,
            task,
            drivingKms,
            drivingHours,
            scheduledDeparture,
            actualDeparture,
            status,
        } = req.body;
        const newRoute = new Route({
            _id,
            scheduledArrival,
            actualArrival,
            address,
            task,
            drivingKms,
            drivingHours,
            scheduledDeparture,
            actualDeparture,
            status,
        });
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await Route.findById(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        if (req.body._id) {
            route._id = req.body._id;
            route.scheduledArrival = req.body.scheduledArrival;
            route.actualArrival = req.body.actualArrival;
            route.address = req.body.address;
            route.task = req.body.task;
            route.drivingKms = req.body.drivingKms;
            route.drivingHours = req.body.drivingHours;
            route.scheduledDeparture = req.body.scheduledDeparture;
            route.actualDeparture = req.body.actualDeparture;
            route.status = req.body.status;
        }
        const updatedRoute = await route.save();
        res.json(updatedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await Route.findById(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        await route.deleteOne();
        res.json({ message: 'Route deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};