import mongoose from 'mongoose';
import Company from "./Company.js";

const resultSchema = new mongoose.Schema({
    resultId: String,
    orderId: String,
    customer: Company,
    driverId: String,
    driverName: String,
    driverEmail: String,
    scheduledKms: String,
    typeOfProducts: String,
    contactPersonName: String,
    contactPersonPhone: String,
    contactPersonEmail: String,
    carId: String,
    licencePlateOfCar: String,
    typeOfCar: String,
    typeOfName: String,
    scheduledTime: String,
    description: String,
    price: Number,
    profit: Number,
    expenses: Number,
});

const Result = mongoose.model('Result', resultSchema);

export default Result;