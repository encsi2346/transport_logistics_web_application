import mongoose from 'mongoose';
import User from "./User.js";

const dockingPointSchema = new mongoose.Schema({
    dockingPointId: String,
    country: String,
    postcode: String,
    city: String,
    nameOfPublicArea: String,
    typeOfPublicArea: String,
    houseNumber: String,
    departureDate: String,
    departureTime: String,
    destinationDate: String,
    destinationTime: String,
    isItOwnLocation: Boolean,
    driverId: String,
    driverName: String,
    passengers: [User],
});

const DockingPoint = mongoose.model('DockingPoint', dockingPointSchema);

export default DockingPoint;