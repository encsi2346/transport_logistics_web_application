import mongoose from 'mongoose';
import {FuelType} from "./enums/FuelType.js";
import {v4 as uuidv4} from "uuid";
import {GearboxType} from "./enums/GearboxType.js";
import {StatusOfDockingPoint} from "./states/StatusOfDockingPoint.js";

const carTypeSchema = new mongoose.Schema({
    brand: String, //márka
    model: String, //modell
    design: String, //kivitel
    gearbox:{
        type: String,
        enum: Object.values(GearboxType),
    },
    selfWeight: Number, //saját tömeg
    totalWeight: Number, //együttes tömeg
    payloadWeight: Number, //hasznos teher
    numberOfSeats: Number, //ülések száma
    fuel:{
        type: String,
        enum: Object.values(FuelType),
    },
    heightOfCargoArea: Number, //raktér magassága
    widthOfCargoArea: Number, //raktér szélessege
    lengthOfCargoArea: Number, //raktér hosszúsága
    volumeOfCargoArea: Number, //raktér térfogata
    typeOfTransport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarTypeOfTransportation", //kiválasztott szállítási típus
    },
    countOfCars: {
        type: Number,
        default: 0,
    },
});

const CarType = mongoose.model('CarType', carTypeSchema);

export default CarType;