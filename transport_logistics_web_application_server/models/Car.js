import mongoose from 'mongoose';
import CarType from "./CarType.js";

const carSchema = new mongoose.Schema({
    carId: String,
    name: String,
    type: CarType,
    licencePlate: String, //rendszám
    numberOfRegistrationLicence: String, //forgalmi engedély száma
    chassisNumber: String, //alvázszám
    yearOfProduction: Number, //gyártási év
    dateOfFirstRegistration: Number, //első nyilvántartásba vétel
    images: [String], //képek
    dateOfDatabaseRegistration: Number, //adatbázis regisztráció dátuma
    dateOfLastTechnicalExamination: Number, //legutóbbi műszaki vizsga időpontja
    dateOfLastService: Number, //legutóbbi szervíz időpontja
    totalDrivenKm: Number, //összes megtett km
    totalTransport: Number, //összes végrehajtott szállítás
});

const Car = mongoose.model('Car', carSchema);

export default Car;