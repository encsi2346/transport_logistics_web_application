import mongoose from 'mongoose';
import {InvoiceStatus} from "./enums/InvoiceStatus.ts";

const invoiceSchema = new mongoose.Schema({
    invoiceId: String,
    orderId: String,
    companyId: String,
    companyName: String,
    dateOfCreation: String,
    deadlineForPayment: String,
    price: String,
    status: InvoiceStatus,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;