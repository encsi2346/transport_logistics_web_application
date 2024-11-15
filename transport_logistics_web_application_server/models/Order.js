import mongoose from 'mongoose';
import Company from "./Company.js";
import Route from "./Route.js";
import SelectedProduct from "./SelectedProduct.js";
import DockingPoint from "./DockingPoint.js";
import Result from "./Result.js";
import Invoice from "./Invoice.js";
import {OrderStatus} from "./states/OrderStatus.js";
import {v4 as uuidv4} from "uuid";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: uuidv4,
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company", // Reference to User model for each passenger
    },
    route: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route", // Reference to User model for each passenger
        },
    ],
    selectedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SelectedProduct", // Reference to User model for each passenger
        },
    ],
    totalWeightsOfSelectedProducts: Number,
    departurePoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DockingPoint", // Reference to User model for each passenger
    },
    destinationPoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DockingPoint", // Reference to User model for each passenger
    },
    dockingPoints: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DockingPoint", // Reference to User model for each passenger
        },
    ],
    results: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result", // Reference to User model for each passenger
    },
    documents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document", // Reference to User model for each passenger
        },
    ],
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice", // Reference to User model for each passenger
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment", // Reference to User model for each passenger
        },
    ],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;