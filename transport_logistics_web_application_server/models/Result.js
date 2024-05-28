import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    _id: String,
    customer: String, //TODO: Company
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