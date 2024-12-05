import mongoose from 'mongoose';
import {FuelType} from "./enums/FuelType.js";
import {v4 as uuidv4} from "uuid";

const carTypeOfTransportationSchema = new mongoose.Schema({
    carTypeOfTransportationId: {
        type: String,
        default: uuidv4,
    },
    type: String, //típus neve
    countOfCars: {
        type: Number,
        default: 0, // Initialize countOfCars to 0
    }, //ilyen típusú autók száma
});

const CarTypeOfTransportation = mongoose.model('CarTypeOfTransportation', carTypeOfTransportationSchema);

export default CarTypeOfTransportation;