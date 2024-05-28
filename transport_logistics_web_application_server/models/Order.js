import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    _id: String,
    status: String, //TODO: enum
    company: String, //TODO: Company
    route: [String], //TODO: Route
    selectedProducts: [String], //TODO: SelectedProducts
    totalWeightsOfSelectedProducts: Number,
    departurePoint: String, //TODO: DockingPoint
    destinationPoint: String, //TODO: DockingPoint
    dockingPoints: [String], //TODO: DockingPoints
    results: String, //TODO: Result
    documents: [String], //TODO: Document
    invoice: String, //TODO: Invoice
    comments: [String], //TODO: Comment
});

const Order = mongoose.model('Order', orderSchema);

export default Order;