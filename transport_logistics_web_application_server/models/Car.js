import mongoose from 'mongoose';
import CarType from "./CarType.js";
import {v4 as uuidv4} from "uuid";

const carSchema = new mongoose.Schema({
    carId: {
        type: String,
        default: uuidv4,
    },
    name: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarType", //kiválasztott típus
    },
    licencePlate: String, //rendszám
    numberOfRegistrationLicence: String, //forgalmi engedély száma
    chassisNumber: String, //alvázszám
    yearOfProduction: Date, //gyártási év //TODO: date vagy int?
    dateOfFirstRegistration: Date, //első nyilvántartásba vétel
    images: [String], //képek
    dateOfDatabaseRegistration: Date, //adatbázis regisztráció dátuma
    dateOfLastTechnicalExamination: Date, //legutóbbi műszaki vizsga időpontja
    dateOfLastService: Date, //legutóbbi szervíz időpontja
    totalDrivenKm: Number, //összes megtett km
    totalTransport: Number, //összes végrehajtott szállítás
});

const Car = mongoose.model('Car', carSchema);

export default Car;