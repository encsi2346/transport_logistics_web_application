import mongoose from 'mongoose';

const dockingPointSchema = new mongoose.Schema({
    _id: String,
    country: String,
    postcode: String,
    city: String,
    nameOfPublicArea: String,
    typeOfPublicArea: String,
    houseNumber: String,
    departureDate: String, //TODO: date
    departureTime: String, //TODO: time
    destinationDate: String, //TODO:date
    destinationTime: String, //TODO: time
    isItOwnLocation: Boolean,
    driverId: String, //TODO: userId
    driverName: String, //TODO: userName
    passengers: [String], ////TODO: userek idvel nammel - array type
});

const DockingPoint = mongoose.model('DockingPoint', dockingPointSchema);

export default DockingPoint;