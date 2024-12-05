import mongoose from 'mongoose';
import {FuelType} from "./enums/FuelType.js";
import {v4 as uuidv4} from "uuid";

const carTypeSchema = new mongoose.Schema({
    carTypeId: {
        type: String,
        default: uuidv4,
    },
    brand: String, //márka
    typeName: String, //típus neve
    design: String, //kivitel
    performance: String, //teljesítmény
    selfWeight: Number, //saját tömeg
    usefulWeight: Number, //hasznos teher
    numberOfSeats: Number, //ülések száma
    fuel: {
        type: String,
        enum: Object.values(FuelType), //üzemanyag
    },
    towing: Number, //vontatas
    height: Number, //magasság
    width: Number, //szelesseg
    long: Number, //hosszúság
    carTypeOfTransportationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarTypeOfTransportation", //kiválasztott szállítás típus
    },
    countOfCars: {
        type: Number,
        default: 0, // Initialize countOfCars to 0
    },
});

const CarType = mongoose.model('CarType', carTypeSchema);

export default CarType;