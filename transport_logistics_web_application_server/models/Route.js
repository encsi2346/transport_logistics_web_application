import mongoose from 'mongoose';
import Address from "./Address.js";
import {RouteStatus} from "./states/RouteStatus.js";
import {v4 as uuidv4} from "uuid";
import {InvoiceStatus} from "./states/InvoiceStatus.js";

const routeSchema = new mongoose.Schema({
    routeId: {
        type: String,
        default: uuidv4,
    },
    scheduledArrival: String,
    actualArrival: String,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address", // Reference to User model for driver
    },
    task: String,
    drivingKms: String,
    drivingHours: String,
    scheduledDeparture: String,
    actualDeparture: String,
    status:{
        type: String,
        enum: Object.values(RouteStatus),
    },
});

const Route = mongoose.model('Route', routeSchema);

export default Route;