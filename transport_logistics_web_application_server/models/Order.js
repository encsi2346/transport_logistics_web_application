import mongoose from 'mongoose';
import Company from "./Company.js";
import Route from "./Route.js";
import SelectedProduct from "./SelectedProduct.js";
import DockingPoint from "./DockingPoint.js";
import Result from "./Result.js";
import Invoice from "./Invoice.js";
import {OrderStatus} from "./states/OrderStatus.js";

const orderSchema = new mongoose.Schema({
    orderId: String,
    status: OrderStatus,
    company: Company,
    route: [Route],
    selectedProducts: [SelectedProduct],
    totalWeightsOfSelectedProducts: Number,
    departurePoint: DockingPoint,
    destinationPoint: DockingPoint,
    dockingPoints: [DockingPoint],
    results: Result,
    documents: [Document],
    invoice: Invoice,
    comments: [Comment],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;