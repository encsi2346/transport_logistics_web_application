import mongoose from 'mongoose';
import Car from "./Car.js";
import {v4 as uuidv4} from "uuid";

const serviceAppointmentSchema = new mongoose.Schema({
    serviceAppointmentId: {
        type: String,
        default: uuidv4,
    },
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
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car", // kategória
    },
});

const ServiceAppointment = mongoose.model('ServiceAppointment', serviceAppointmentSchema);

export default ServiceAppointment;