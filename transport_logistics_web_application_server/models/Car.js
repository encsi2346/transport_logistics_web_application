import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: String,
    type: String, //TODO cartype
    licencePlate: String, //rendszám
    numberOfRegistrationLicence: String, //forgalmi engedély száma
    chassisNumber: String, //alvázszám
    yearOfProduction: Number, //gyártási év
    dateOfFirstRegistration: Number, //első nyilvántartásba vétel
    images: String, //képek TODO: images array
    dateOfDatabaseRegistration: Number, //adatbázis regisztráció dátuma
    dateOfLastTechnicalExamination: Number, //legutóbbi műszaki vizsga időpontja
    dateOfLastService: Number, //legutóbbi szervíz időpontja
    totalDrivenKm: Number, //összes megtett km
    totalTransport: Number, //összes végrehajtott szállítás
});

const Car = mongoose.model('Car', carSchema);

export default Car;