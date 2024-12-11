import mongoose from 'mongoose';
import User from "./User.js";
import {v4 as uuidv4} from "uuid";
import {DocumentType} from "./enums/DocumentType.js";
import {TypeOfDockingPoint} from "./enums/TypeOfDockingPoint.js";
import {StatusOfDockingPoint} from "./states/StatusOfDockingPoint.js";

const dockingPointSchema = new mongoose.Schema({
    country: String,
    postcode: String,
    city: String,
    nameOfPublicArea: String,
    typeOfPublicArea: String,
    houseNumber: String,
    plannedDepartureDate: String,
    plannedDepartureTime: String,
    plannedArrivalDate: String,
    plannedArrivalTime: String,
    realDepartureDate: String,
    realDepartureTime: String,
    realArrivalDate: String,
    realArrivalTime: String,
    isItWarehouse: Boolean,
    task: String,
    drivenKms: Number,
    drivenHours: Number,
    statusOfDockingPoint:  {
        type: String,
        enum: Object.values(StatusOfDockingPoint),
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    passengersId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    typeOfDockingPoint: {
        type: String,
        enum: Object.values(TypeOfDockingPoint),
    },
});

const DockingPoint = mongoose.model('DockingPoint', dockingPointSchema);

export default DockingPoint;