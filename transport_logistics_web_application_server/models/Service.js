import mongoose from 'mongoose';
import Car from "./Car.js";

const serviceSchema = new mongoose.Schema({
    serviceId: String,
    appointment: String, //szervíz időpontja
    nameOfServiceCompany: String, //szervíz neve
    driverName: String, //szállító kolléga neve
    dateOfRecording: String, //rögzítés időpontja
    grossSumPrice: Number, //összes bruttó ár
    netSumPrice: Number, //összes nettó ár
    VAT: Number, //áfa
    title: String, //tárgy
    description: String, //leírás
    reparation: String, //részletek TODO javítás array --> mit-csere/javítás/átnézés-bruttóár-nettóár
    car: Car, //szervizelt autó
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;