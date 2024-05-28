import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    _id: String,
    orderId: String,
    companyName: String,
    dateOfCreation: String,
    deadlineForPayment: String,
    price: String,
    status: String, //TODO: enum
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;