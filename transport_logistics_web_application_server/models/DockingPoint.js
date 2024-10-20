import mongoose from 'mongoose';
import User from "./User.js";
import {v4 as uuidv4} from "uuid";

const dockingPointSchema = new mongoose.Schema({
    dockingPointId: {
        type: String,
        default: uuidv4,
    },
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