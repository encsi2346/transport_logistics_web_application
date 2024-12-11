import mongoose from 'mongoose';
import {FuelType} from "./enums/FuelType.js";
import {v4 as uuidv4} from "uuid";

const carTypeOfTransportationSchema = new mongoose.Schema({
    nameOfType: String,
    countOfCarTypes: {
        type: Number,
        default: 0,
    },
    countOfCars: {
        type: Number,
        default: 0,
    },
});

const CarTypeOfTransportation = mongoose.model('CarTypeOfTransportation', carTypeOfTransportationSchema);

export default CarTypeOfTransportation;