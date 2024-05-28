import mongoose from 'mongoose';
import CarType from "./CarType.js";
import Car from "./Car.js";
import DockingPoint from "./DockingPoint.js";
import SelectedProduct from "./SelectedProduct.js";

const transportationSchema = new mongoose.Schema({
    transportationId: String,
    selectedCarType: CarType,
    selectedCar: Car,
    departurePoint: DockingPoint,
    destinationPoint: DockingPoint,
    dockingPoints: [DockingPoint],
    selectedProducts: [SelectedProduct],
    totalWeightsOfSelectedProducts: Number,
});

const Transportation = mongoose.model('Transportation', transportationSchema);

export default Transportation;