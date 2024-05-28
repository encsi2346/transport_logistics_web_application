import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
    _id: String,
    scheduledArrival: String,
    actualArrival: String,
    address: String, //TODO: Address
    task: String,
    drivingKms: String,
    drivingHours: String,
    scheduledDeparture: String,
    actualDeparture: String,
    status: String, //TODO: enum
});

const Route = mongoose.model('Route', routeSchema);

export default Route;