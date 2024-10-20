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
    fuel: FuelType, //üzemanyag
    vontatas: Number, //TODO: angolul
    height: Number, //magasság
    szelesseg: Number, //szelesseg
    long: Number, //hosszúság
});

const CarType = mongoose.model('CarType', carTypeSchema);

export default CarType;