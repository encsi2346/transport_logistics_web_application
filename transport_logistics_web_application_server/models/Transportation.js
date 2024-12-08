import mongoose from 'mongoose';
import CarType from "./CarType.js";
import Car from "./Car.js";
import DockingPoint from "./DockingPoint.js";
import SelectedProduct from "./SelectedProduct.js";
import {v4 as uuidv4} from "uuid";

const transportationSchema = new mongoose.Schema({
    transportationId: {
        type: String,
        default: uuidv4,
    },
    selectedTypeOfTransportationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarTypeOfTransportation", // szállítási kategória
    },
    selectedCarTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarType", // kategória
    },
    selectedCarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car", // kategória
    },
    departureDockingPointId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DockingPoint", // kategória
    },
    arrivalDockingPointId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DockingPoint", // kategória
    },
    dockingPoints: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DockingPoint", // kategória
        },
    ],
    selectedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SelectedProduct", // kategória
        },
    ],
    selectedDriverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // kategória
    },
    selectedPassengers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // kategória
        },
    ],
    totalWeightsOfSelectedProducts: Number,
});

const Transportation = mongoose.model('Transportation', transportationSchema);

export default Transportation;