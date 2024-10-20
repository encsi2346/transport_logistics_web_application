import mongoose from 'mongoose';
import Address from "./Address.js";
import {RouteStatus} from "./states/RouteStatus.js";
import {v4 as uuidv4} from "uuid";

const routeSchema = new mongoose.Schema({
    routeId: {
        type: String,
        default: uuidv4,
    },
    scheduledArrival: String,
    actualArrival: String,
    address: Address,
    task: String,
    drivingKms: String,
    drivingHours: String,
    scheduledDeparture: String,
    actualDeparture: String,
    status: RouteStatus,
});

const Route = mongoose.model('Route', routeSchema);

export default Route;