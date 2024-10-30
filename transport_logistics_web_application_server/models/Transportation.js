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
    selectedCarType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarType", // kategória
    },
    selectedCar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car", // kategória
    },
    departurePoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DockingPoint", // kategória
    },
    destinationPoint: {
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
    totalWeightsOfSelectedProducts: Number,
});

const Transportation = mongoose.model('Transportation', transportationSchema);

export default Transportation;