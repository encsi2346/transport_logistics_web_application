import mongoose from 'mongoose';

const transportationSchema = new mongoose.Schema({
    _id: String,
    selectedCarType: String, //TODO:carType
    selectedCar: String, //TODO:car
    departurePoint: String, //TODO: DockingPoint
    destinationPoint: String, //TODO: DockingPoint
    dockingPoints: String, //TODO: DockingPoint
    selectedProducts: String, //TODO: SelectedProducts
    totalWeightsOfSelectedProducts: Number,
});

const Transportation = mongoose.model('Transportation', transportationSchema);

export default Transportation;